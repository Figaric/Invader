import { ValidationError } from "apollo-server-core";
import { GraphQLError } from "graphql";
import FieldError from "../errors/FieldError";

export default function handleError(error: GraphQLError) {

    if(error.originalError instanceof FieldError) {
        return {
            field: error.extensions?.field,
            message: error.message,
            code: error.extensions?.code
        }
    }

    if(error.originalError instanceof ValidationError) {
        const validationError = error.extensions?.exception;

        return {
            field: validationError.path,
            message: error.message,
            code: "BAD_USER_INPUT"
        }
    }

    console.log("err: ", error);

    return error;
}