import { Express } from "express";
import session from "express-session";
import connectRedis, { Client } from "connect-redis";

export default function setupSession(app: Express, redisClient: Client) {

    const RedisStore = connectRedis(session);

    app.use(session({
        name: "qid",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
            httpOnly: true,
            sameSite: "lax",
            secure: false
        },
        saveUninitialized: true,
        resave: false,
        secret: "y39874yc3nw097yt"
    }));
}