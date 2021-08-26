import { Request, Response } from "express";
import { Session } from "express-session";

type ApolloContext = {
    req: Request & { session: Session & { userId: number } };
    res: Response;
};

export default ApolloContext;