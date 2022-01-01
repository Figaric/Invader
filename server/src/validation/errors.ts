import { ApolloError } from "apollo-server-express";

export class FieldError extends ApolloError {
    constructor(message: string, fieldName: string) {
        super(message, "FIELD_ERROR", {
            fieldName
        });
    }
}