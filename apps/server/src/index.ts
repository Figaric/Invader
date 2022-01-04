import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PORT } from "./constants";
import { PrismaClient } from "./prisma/generated/prisma";
import UserResolver from "./resolvers/UserResolver";

const prisma = new PrismaClient();

async function main() {
    const app = express();

    const graphQlSchema = await buildSchema({
        resolvers: [
            UserResolver
        ],
        validate: false
    });

    const apolloServer = new ApolloServer({
        schema: graphQlSchema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground
        ],
        context: ({ req, res }) => ({ req, res, prisma })
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => console.log("Server is running at port " + PORT));
}

main()
    .catch(err => console.error(err))
    .finally(async () => await prisma.$disconnect());
