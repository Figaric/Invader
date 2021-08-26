import Group from "../entities/Group";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import GroupMember from "src/entities/GroupMember";
import ApolloContext from "src/types/ApolloContext";

@Resolver(Group)
export default class GroupResolver {
    @Query(() => Group)
    async getGroup(
        @Arg("groupId", () => Int) groupId: number
    ): Promise<Group> {
        const group = await Group.findOne(groupId);

        if(!group) {
            throw new Error("Not Found");
        }

        return group;
    }

    @Mutation(() => Int)
    async createGroup(
        @Arg("name") groupName: string,
        @Arg("description") description: string,
        @Ctx() { req }: ApolloContext
    ): Promise<number> {
        let newGroupId = 0;
        
        await getConnection("development").transaction(async t => {
            const newGroup = t.create<Group>(Group, {
                name: groupName,
                description
            });
            await t.insert(Group, newGroup);

            newGroupId = newGroup.id;

            await t.insert<GroupMember>(GroupMember, {
                isAdmin: true,
                groupId: newGroup.id,
                memberId: req.session.userId
            });
        });

        return newGroupId;
    }
}