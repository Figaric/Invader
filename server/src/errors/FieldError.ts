import { ApolloError } from "apollo-server-express";

export default class FieldError extends ApolloError {
    field: string;

    constructor(field: string, message: string, errorCode?: string) {
        super(message, errorCode ? errorCode : "FIELD_ERROR");

        this.field = field;
    }
}