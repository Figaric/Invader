import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { RegisterInput } from "../inputs";
import { User } from "../prisma/generated/type-graphql";
import { registerSchema } from "validation";
import ApolloContext from "../ApolloContext";
import argon2 from "argon2";

@Resolver(() => User)
export default class UserResolver {
    @Mutation(() => Boolean)
    async register(
        @Arg("input") input: RegisterInput,
        @Ctx() { prisma }: ApolloContext
    ): Promise<boolean> {
        await registerSchema.validate(input);

        const hashedPassword = await 

        const newUser = await prisma.user.create();

        return true;
    }

}