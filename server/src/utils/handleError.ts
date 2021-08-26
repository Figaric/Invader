import { UserInputError, ValidationError } from "apollo-server-core";
import { GraphQLError } from "graphql";

export default function handleError(error: GraphQLError) {
    

    if(error.originalError instanceof UserInputError) {
        return {
            field: error.extensions?.field,
            message: error.message, 
            code: error.extensions?.code
        };
    }

    if(error.originalError instanceof ValidationError) {
        const validationError = error.extensions?.exception;

        return {
            field: validationError.path,
            message: error.message,
            code: "BAD_USER_INPUT"
        }
    }

    return error;
}