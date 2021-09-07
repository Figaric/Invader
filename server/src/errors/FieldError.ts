import { ApolloError } from "apollo-server-core";

export default class FieldError extends ApolloError {
    constructor(field: string, message: string) {
        super(message, "FIELD_ERROR", {
            field
        });
    }
}