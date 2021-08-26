import User from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import ApolloContext from "../types/ApolloContext";
import validator from "validator";
import { ApolloError, UserInputError } from "apollo-server-express";
import argon2 from "argon2";
import registerSchema from "../validation/RegisterSchema";

@Resolver(User)
export default class UserResolver {
    @Query(() => User)
    @UseMiddleware()
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
            throw new UserInputError(`User with this ${lookBy.username ? "username" : "email"} does not exist.`, {
                field: "usernameOrEmail"
            });
        }

        const passwordVerification = await argon2.verify(user.password, password);

        if(!passwordVerification) {
            throw new UserInputError(`Invalid password`, {
                field: "password"
            });
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
                throw new UserInputError(`This ${wrongFieldName} is already taken`, {
                    field: wrongFieldName
                });
            }

            throw new ApolloError("Something went wrong");
        }

        return true;
    }
}