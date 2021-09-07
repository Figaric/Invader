import Group from "../entities/Group";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import GroupMember from "../entities/GroupMember";
import ApolloContext from "../types/ApolloContext";
import FieldError from "../errors/FieldError";
import NotFoundError from "../errors/NotFoundError";

@Resolver(Group)
export default class GroupResolver {
    @Query(() => [GroupMember])
    async myGroups(
        @Ctx() { req }: ApolloContext
    ): Promise<GroupMember[]> {
        const groups = await getConnection("development").query(`
        select gm."isAdmin",
        gm."groupId",
        json_build_object(
            'name', g.name,
            'description', g.description
        ) "group"
        from "groupMembers" gm
        inner join public.groups g on g.id = gm."groupId"
        where gm."memberId" = $1;
        `, [req.session.userId]);

        return groups;
    }

    @Query(() => [GroupMember])
    async groupMembers(
        @Arg("groupId", () => Int) groupId: number
    ): Promise<GroupMember[]> {
        const groupMembers = await getConnection("development").query(`
        select gm."isAdmin",
        gm."memberId",
        json_build_object(
            'username', u.username
        ) member
        from "groupMembers" gm
        inner join public.users u on u.id = gm."memberId"
        where gm."groupId" = $1;
        `, [groupId]);

        return groupMembers;
    }

    @Query(() => Group)
    async group(
        @Arg("groupId", () => Int) groupId: number
    ): Promise<Group> {
        const group = await Group.findOne(groupId);

        if(!group) {
            throw new NotFoundError();
        }

        return group;
    }

    // @Mutation(() => Boolean)
    // async editGroupInfo(
    //     @Arg("groupId", () => Int) groupId: number
    // ): Promise<Boolean> {
    //     const group = await Group.findOne(groupId);

        

    //     return true;
    // }

    @Mutation(() => Boolean)
    async leaveGroup(
        @Arg("groupId", () => Int) groupId: number,
        @Ctx() { req }: ApolloContext
    ): Promise<Boolean> {
        try {
            await GroupMember.delete({
                groupId,
                memberId: req.session.userId
            });
        } catch {
            if(!(await GroupMember.findOne({ where: { groupId, memberId: req.session.userId } }))) {
                throw new FieldError("groupId", "You're not a member of this group");
            }
        }
        
        return true;
    }

    @Mutation(() => Boolean)
    async joinGroup(
        @Arg("groupId", () => Int) groupId: number,
        @Ctx() { req }: ApolloContext
    ): Promise<Boolean> {
        try {
            await GroupMember.insert({
                groupId,
                memberId: req.session.userId,
                isAdmin: false
            });
        } catch {
            if(await GroupMember.findOne({ where: { groupId, memberId: req.session.userId } })) {
                throw new FieldError("groupId", "You're already in this group");
            }
        }

        return true;
    }

    @Mutation(() => Int)
    async createGroup(
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Ctx() { req }: ApolloContext
    ): Promise<number> {
        let newGroupId = 0;
        
        await getConnection("development").transaction(async t => {
            const newGroup = t.create<Group>(Group, {
                name,
                description
            });

            try {
                await t.insert(Group, newGroup);
            } catch {
                if(await Group.findOne({ where: { name } })) {
                    throw new FieldError("name", "This name is already taken.");
                }
            }

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