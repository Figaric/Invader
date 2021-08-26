import { BaseEntity, getConnection } from "typeorm";

export default class BetterEntity extends BaseEntity {
    constructor() {
        super()

        BaseEntity.useConnection(getConnection("development"));
    }
}