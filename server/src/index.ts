import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express = require("express");
import session = require("express-session");
import connectRedis from "connect-redis";
import redis from "ioredis";
import { mongoose } from "@typegoose/typegoose";
import userRouter from "./resolvers/UserRouter";
import IsUserInputNull from "./middlewares/IsUserInputNull";

const main = async () => {
    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = new redis();

    mongoose.connect(process.env.INVADER_DB_URL!, {
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
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        },
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET!
    }));

    // routers
    app.use("/account", IsUserInputNull, userRouter);

    app.listen(8080, () => {
        console.log("Server started on localhost:8080");
    });
};

main().catch(err => {
    console.error(err);
});