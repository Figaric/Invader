import { ForbiddenError } from "apollo-server-express";
import ContextType from "src/types/ContextType";
import { MiddlewareFn } from "type-graphql";

const MustBeAuth: MiddlewareFn<ContextType> = async ({ context }, next) => {
    
    if(!context.req.session.userId) {
        throw new ForbiddenError("You're not authenticated.");
    }

    return await next();
};

export default MustBeAuth;