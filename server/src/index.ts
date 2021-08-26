import "reflect-metadata";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import UserResolver from "./resolvers/UserResolver";
import ApolloContext from "./types/ApolloContext";
import handleError from "./utils/handleError";
import setupRedis from "./utils/setupRedis";
import setupSession from "./utils/setupSession";
import cors from "cors";
import http from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import PostResolver from "./resolvers/PostResolver";
import GroupResolver from "./resolvers/GroupResolver";

async function main() {
    const app = express();
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT || 8080;
    await createConnection("development"); // Use ormconfig.json

    const redisClient = setupRedis();

    //#region Configure express middlewares

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }));
    setupSession(app, redisClient);

    //#endregion

    const graphqlSchema = await buildSchema({
        resolvers: [UserResolver, PostResolver, GroupResolver],
        validate: false
    });

    const apollo = new ApolloServer({
        schema: graphqlSchema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground
        ],
        formatError: handleError,
        context: ({ req, res }) => ({ req, res } as ApolloContext)
    });

    await apollo.start();
    apollo.applyMiddleware({ app, cors: false });

    //#region Setup subscription server

    const subscriptionServer = SubscriptionServer.create({
        schema: graphqlSchema,
        execute,
        subscribe,
    }, {
        server: httpServer,
        path: apollo.graphqlPath,
    });

    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => subscriptionServer.close());
    });

    //#endregion

    httpServer.listen(PORT, () => console.log("Server started on port " + PORT));
}

main().catch(console.error);