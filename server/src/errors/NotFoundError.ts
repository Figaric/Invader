import { ApolloError } from "apollo-server-core";

export default class NotFoundError extends ApolloError {
    constructor() {
        super("Resource you are looking for is not found", "NOT_FOUND");
    }
}