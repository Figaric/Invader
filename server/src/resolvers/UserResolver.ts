import User from "../models/User";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import ContextType from "../types/ContextType";
import FieldError from "../errors/FieldError";
import argon2 from "argon2";
import validator from "validator";
import { ApolloError } from "apollo-server-express";
import MustBeAuth from "../middlewares/MustBeAuth";

@Resolver(User)
export default class UserResolver {
    @Query(() => User, { nullable: true })
    @UseMiddleware(MustBeAuth)
    async me(
        @Ctx() { req }: ContextType
    ): Promise<User | undefined> {
        const currentUser = await User.findOne({ where: { id: req.session.userId } });

        return currentUser;
    }

    @Mutation(() => Boolean)
    async login(
        @Arg("username") username: string,
        @Arg("password") password: string,
        @Ctx() { req }: ContextType
    ): Promise<boolean> {
        const user = await User.findOne({ where: { username: username.toLowerCase() } });

        if(!user) {
            throw new FieldError("username", "Such user doesn't exist.");
        }

        const passwordVerificationResult = await argon2.verify(user.password, password);

        // console.log(`ver result: ${passwordVerificationResult} | hash: ${user.password} | password: ${password}`);

        if(!passwordVerificationResult) {
            throw new FieldError("password", "Incorrect password");
        }
        
        req.session.userId = user.id;

        return true;
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<Boolean> {
        if(!validator.isLength(username, { min: 3 })) {
            throw new FieldError("username", "Username must be at least 3 characters long.");
        }

        if(!validator.isLength(password, { min: 3 })) {
            throw new FieldError("password", "Password must be at least 3 characters long.");
        }

        const lowerUsername = username.toLowerCase();
        const hashedPassword = await argon2.hash(password);

        try {
            await User.insert({
                username: lowerUsername,
                password: hashedPassword
            });
        } catch {
            if(await User.findOne({ where: { username: lowerUsername } })) {
                throw new FieldError("username", "This username is already taken.");
            }

            throw new ApolloError("Something went wrong");
        }

        return true;
    }

}