import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
    @prop({ required: true, unique: true })
    username: string;

    @prop({ required: true })
    password: string;
}

const UserModel = getModelForClass(User);

export default UserModel;