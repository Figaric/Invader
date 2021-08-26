import ApolloContext from "../types/ApolloContext";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { ForbiddenError } from "apollo-server-core";

const MustBeAuth: MiddlewareFn<ApolloContext> = async ({ context }, next) => {
    if(!context.req.session.userId) {
        throw new ForbiddenError("You're not authenticated");
    }

    return await next();
};

export default MustBeAuth;