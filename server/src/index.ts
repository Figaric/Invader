import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { v4 } from "uuid";
import express = require("express");
import session = require("express-session");
import connectRedis from "connect-redis";
import redis from "ioredis";
import { createConnection } from "typeorm";
import Group from "./models/Group";
import User from "./models/User";
import Post from "./models/Post";
import GroupMember from "./models/GroupMember";
import Pusher from "pusher";
import { ApolloServer, ForbiddenError } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import ContextType from "./types/ContextType";
import GroupResolver from "./resolvers/GroupResolver";
import cors from "cors";
import UserResolver from "./resolvers/UserResolver";
import FieldError from "./errors/FieldError";
import PostResolver from "./resolvers/PostResolver";

const main = async () => {
    const app = express();
    await createConnection({
        type: "postgres",
        username: "postgres",
        password: "845967213",
        database: "invader",
        logging: true,
        synchronize: true,
        entities: [Group, User, Post, GroupMember]
    });

    const pusher = new Pusher({
        appId: "1230019",
        key: "aae9612466e1254ef58d",
        secret: process.env.PUSHER_APP_SECRET!,
        cluster: "eu",
        useTLS: true
    });

    const RedisStore = connectRedis(session);
    const redisClient = new redis();

    // middlewares
    app.use(cors({
        credentials: true,
        origin: "http://localhost:3000"
    }));
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

    // apollo server
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [GroupResolver, UserResolver, PostResolver],
            validate: false
        }),
        formatError: (err) => {
            if(err.originalError instanceof FieldError) {
                return { message: err.message, field: err.extensions!.exception.field, code: err.extensions!.code };
            }

            if(err.originalError instanceof ForbiddenError) {
                return { message: err.message, code: err.extensions!.code };
            }

            const errorId = v4();
            console.error("Error id: ", errorId);
            console.error("Error: ", err);

            return { message: "Something went wrong", code: err.extensions!.code, errorId };
        },
        context: ({ req, res }) => ({ req, res, pusher } as ContextType)
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(8080, () => {
        console.log("Server started on localhost:8080");
    });
};

main().catch(err => {
    console.error(err);
});