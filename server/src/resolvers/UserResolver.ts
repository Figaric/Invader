import User from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import ApolloContext from "../types/ApolloContext";
import validator from "validator";
import { ApolloError } from "apollo-server-express";
import argon2 from "argon2";
import registerSchema from "../validation/RegisterSchema";
import FieldError from "../errors/FieldError";
import MustBeAuth from "../middlewares/MustBeAuth";

@Resolver(User)
export default class UserResolver {
    @Query(() => User)
    @UseMiddleware(MustBeAuth)
    async me(
        @Ctx() { req }: ApolloContext
    ): Promise<User> {
        const currentUser = await User.findOne(req.session.userId);

        return currentUser!;
    }

    @Mutation(() => Boolean)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { req }: ApolloContext
    ): Promise<Boolean> {
        const lookBy = validator.isEmail(usernameOrEmail) ? 
            { email: usernameOrEmail } : 
            { username: usernameOrEmail };

        console.log("findBy: ", lookBy);

        const user = await User.findOne({ where: lookBy });

        if(!user) {
            throw new FieldError("usernameOrEmail", `User with this ${lookBy.username ? "username" : "email"} does not exist.`);
        }

        const passwordVerification = await argon2.verify(user.password, password);

        if(!passwordVerification) {
            throw new FieldError("password", `Invalid password`);
        }

        // Succeed

        req.session.userId = user.id;

        return true;
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<Boolean> {
        await registerSchema.validate({
            username,
            email,
            password
        });

        const hashedPassword = await argon2.hash(password);

        try {
            await User.insert({
                username,
                email,
                password: hashedPassword
            });
        } catch(err) {

            const isUsernameError = err.detail.includes("username");
            const wrongFieldName = isUsernameError ? "username" : "email";
            const wrongFieldValue = isUsernameError ? username : email;

            if(await User.findOne({ 
                where: { 
                    [wrongFieldName]: wrongFieldValue 
                } 
            })) {
                throw new FieldError(wrongFieldName, `This ${wrongFieldName} is already taken`);
            }

            throw new ApolloError("Something went wrong");
        }

        return true;
    }
}