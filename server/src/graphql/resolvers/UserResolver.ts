import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import ApolloContext from "../../ApolloContext";
import { registerSchema } from "../../validation/schemas";
import { ApolloError } from "apollo-server-express";
import { FieldError } from "../../validation/errors";
import { User } from "../../prisma/generated/user";

@Resolver()
export default class UserResolver {
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { prisma, req }: ApolloContext
    ): Promise<User | null> {
        if(!req.session.userId) {
            // TODO: Not logged in
            return null;
        }

        const user = await prisma.user.findFirst({
            where: { id: req.session.userId }
        });

        return user;
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("username") username: string,
        @Arg("password") password: string,
        @Arg("email") email: string,
        @Ctx() { prisma }: ApolloContext
    ) {
        await registerSchema.validate({
            username,
            password,
            email
        });

        const hashedPassword = await argon2.hash(password);

        try {
            await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    email,
                }
            });
        } catch(e) {
            if(e.code === "P2002") {
                throw new FieldError("The email is already used", "email");
            }

            throw new ApolloError("Could not create user");
        }

        return true;
    }

    @Mutation(() => Boolean)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { prisma, req }: ApolloContext
    ): Promise<Boolean> {
        if(req.session.userId) {
            // TODO: Already logged in
            return false;
        }

        const fieldToSearchBy = usernameOrEmail.includes("@")
            ? { email : usernameOrEmail }
            : { username: usernameOrEmail };

        const user = await prisma.user.findUnique({
            where: fieldToSearchBy
        });

        if(!user) {
            throw new FieldError("Such account does not exist", "usernameOrEmail");
        }

        const passwordVerificationResult = await argon2.verify(user.password, password);

        if(!passwordVerificationResult) {
            throw new FieldError("Invalid password", "password");
        }

        req.session.userId = user.id;

        return true;
    }
}