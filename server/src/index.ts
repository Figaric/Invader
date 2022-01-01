import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import express from 'express';
import { PORT } from "./constants";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloError, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { GraphQLError } from "graphql";
import "prisma-class-generator";
import UserResolver from "./graphql/resolvers/UserResolver";

const prisma = new PrismaClient();

async function main() {
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(session({
    store: new RedisStore({
      client: redis,
      disableTouch: true
    }),
    secret: "asoiuyytvgegvyglvaiovguya",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    }
  }));

  const graphqlSchema = await buildSchema({
    resolvers: [
      UserResolver
    ],
    validate: false
  });

  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground
    ],
    formatError: (error: GraphQLError) => {
      console.log("Error: ", error);

      return new ApolloError("Internal server error");
    },
    context: ({ req, res }) => ({ req, res, prisma })
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log("Server is running.");
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });