import { ApolloError } from "apollo-server-express";

export class FieldError extends ApolloError {
    public Field: string;

    constructor(message: string, field: string) {
        super(message, "FIELD_ERROR")

        this.Field = field;
    }    
}