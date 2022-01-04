import { Request, Response } from "express";
import { PrismaClient } from "./prisma/generated/prisma";

type ApolloContext = {
    req: Request;
    res: Response,
    prisma: PrismaClient;
}

export default ApolloContext;