import connectRedis from "connect-redis";
import redis from "ioredis";
import env from "dotenv";
import express from "express";
import session from "express-session";
env.config();

import { __prod__ } from "./constants";
import mongoose from "mongoose";
import accountRouter from "./routes/AccountRouter";

const main = async () => {
    const app = express();
    const RedisStore = connectRedis(session);
    const redisClient = new redis(6379, "127.0.0.1");

    mongoose.connect(process.env.CONNECTION_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // middlewares
    app.use(express.json());
    app.use(session({
        name: "qid",
        store: new RedisStore({
            client: redisClient,
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

    // routes
    app.use("/account", accountRouter);

    app.listen(8080, () => {
        console.log("Server started on localhost:8080");
    });
};

main();