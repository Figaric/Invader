import Post from "../models/Post";
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import MustBeAuth from "../middlewares/MustBeAuth";
import ContextType from "../types/ContextType";
import GroupMember from "../models/GroupMember";
import { ApolloError } from "apollo-server-express";
import Group from "../models/Group";
import { getConnection } from "typeorm";

@Resolver(Post)
export default class PostResolver {
    @Query(() => [Post])
    async getPosts(
        @Arg("groupId", () => Int) groupId: number
    ): Promise<Post[]> {
        if(!(await Group.findOne({ where: { groupId } }))) {
            throw new ApolloError("This group doesn't exist.");
        }

        const posts = await getConnection().query(`
        select p.title, p.text, 
        json_build_object(
            'username', $1
        ) creator,
        from posts
        inner join "groups" g on g."groupId" = p.id
        where p."groupId";
        `);

        return posts;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(MustBeAuth)
    async createPost(
        @Arg("title") title: string,
        @Arg("text") text: string,
        @Arg("groupId", () => Int) groupId: number,
        @Ctx() { req, pusher }: ContextType
    ): Promise<boolean> {
        if(!(await GroupMember.findOne({ where: { memberId: req.session.userId, groupId } }))) {
            throw new ApolloError("You're not in the group", "NOT_IN_GROUP");
        }

        const newPost = await Post.create({
            authorId: req.session.userId,
            groupId,
            title,
            text
        }).save();

        pusher.trigger(`group-${groupId}`, "post-created", {
            id: newPost.id,
            title,
            text,
            authorId: req.session.userId
        });

        return true;
    }
}