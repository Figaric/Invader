import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { Session } from "express-session";

type ApolloContext = {
    prisma: PrismaClient;
    req: Request & { session: Session & { userId: number } };
    res: Response;
};

export default ApolloContext;