import Post from "../entities/Post";
import { Arg, Ctx, Int, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import Group from "../entities/Group";
import { UserInputError } from "apollo-server-core";
import ApolloContext from "../types/ApolloContext";
import MustBeAuth from "../middlewares/MustBeAuth";

@Resolver(Post)
export default class PostResolver {
    @Query(() => [Post])
    async getPosts(
        @Arg("groupId", () => Int) groupId: number
    ): Promise<Post[]> {
        const posts = await getConnection("development").query(`
        select p.*,
        json_build_object(
            'id', u.id,
            'username', u.username
        ) author
        from "posts" p
        inner join public.users u on u.id = p."authorId"
        where p."groupId" = $1;
        `, [groupId]);

        return posts;
    }

    @Subscription({
        topics: "POST_NEW"
    })
    newPost(
        @Root() postPayload: { post: Post }
    ): Post {
        return postPayload.post;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(MustBeAuth)
    async createPost(
        @Arg("title") title: string,
        @Arg("text") text: string,
        @Arg("groupId", () => Int) groupId: number,
        @Ctx() { req }: ApolloContext,
        @PubSub() pubSub: PubSubEngine
    ): Promise<boolean> {
        const group = await Group.findOne({ where: { id: groupId } });

        if(!group) {
            throw new UserInputError("Group with this id is not found", {
                field: "groupId"
            });
        }

        const post = Post.create({
            title,
            text,
            groupId,
            authorId: req.session.userId
        });

        await Post.insert(post);

        // triggering subscription "newPost"
        const postPayload = { post };
        await pubSub.publish("POST_NEW", postPayload);

        return true;
    }
}