import Group from "../models/Group";
import { getConnection } from "typeorm";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import ContextType from "../types/ContextType";
import MustBeAuth from "../middlewares/MustBeAuth";
import FieldError from "../errors/FieldError";
import GroupMember from "../models/GroupMember";

@Resolver(Group)
export default class GroupResolver {

    @Query(() => [GroupMember])
    async getGroupMembers(
        @Arg("groupId") groupId: number
    ): Promise<GroupMember[]> {
        const members = await getConnection().query(`
        select gm.isAdmin,
        json_build_object(
            'id', u.id
            'username', u.username
        ) member
        from "groupMembers" gm
        inner join public.users u on u.id = gm."memberId"
        where gm."groupId" = $1;
        `, [groupId]);

        console.log(members);

        return members;
    }

    @Query(() => Group, { nullable: true })
    async getGroup(
        @Arg("groupId") groupId: number
    ): Promise<Group | undefined> {
        const group = await Group.findOne({ where: { id: groupId } });

        return group;
    }

    @Query(() => [Group])
    @UseMiddleware(MustBeAuth)
    async myGroups(
        @Ctx() { req }: ContextType
    ): Promise<Group[]> {
        const groups = (await getConnection().query(`
        select json_build_object(
            'id', g.id,
            'name', g.name
        ) "group"
        from "groupMembers" gm
        inner join "groups" g on g.id = gm."groupId"
        where gm."memberId" = $1;
        `, [req.session.userId])).map((g: any) => g.group);

        return groups;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(MustBeAuth)
    async joinGroup(
        @Arg("groupName") groupName: string,
        @Ctx() { req }: ContextType
    ): Promise<boolean> {
        const group = await Group.findOne({ where: { name: groupName } });

        if(!group) {
            throw new FieldError("groupName", "Group with name " + groupName + " is not found.");
        }

        if(await GroupMember.findOne({ where: { groupId: group.id, memberId: req.session.userId } })) {
            throw new FieldError("groupName", "You're already a member of this group.");
        }

        await GroupMember.insert({
            groupId: group.id,
            memberId: req.session.userId
        });

        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(MustBeAuth)
    async createGroup(
        @Arg("groupName") groupName: string,
        @Ctx() { req }: ContextType
    ): Promise<boolean> {
        await getConnection().transaction(async t => {
            const newGroup = await t.query(`
            insert into "groups" ("name") values ($1)
            `, [groupName]);

            console.log("New group: ", newGroup);

            await t.query(`
            insert into "groupMembers" ("userId", "groupId") values ($1, $2)
            `, [req.session.userId, newGroup.id]);
        });

        return true;
    }
}