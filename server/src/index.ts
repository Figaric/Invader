import env from "dotenv";
env.config();

import session from "express-session";
import redis from "ioredis";
import express from "express";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";
import accountRouter from "./routes/AccountRouter";
import { createConnection } from "typeorm";
import User from "./models/User";

const main = async () => {
    const app = express();

    await createConnection({
        type: "mongodb",
        url: process.env.CONNECTION_URL,
        synchronize: true,
        logging: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        entities: [User]
    });

    const RedisStore = connectRedis(session);
    const client = new redis(6379, "127.0.0.1");

    app.use(express.json());
    app.use(session({
        name: "qid",
        store: new RedisStore({
            client,
            disableTouch: true
        }),
        saveUninitialized: false,
        resave: false,
        secret: process.env.SESSION_SECRET!,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            sameSite: "lax",
            secure: __prod__
        }
    }));
    app.use("/account", accountRouter);

    app.listen(8080, () => {
        console.log("Server started on localhost:8080");
    });
};

main();