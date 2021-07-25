import Group from "../models/Group";
import { getConnection } from "typeorm";
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import ContextType from "../types/ContextType";
import MustBeAuth from "../middlewares/MustBeAuth";
import FieldError from "../errors/FieldError";
import GroupMember from "../models/GroupMember";

@Resolver(Group)
export default class GroupResolver {
    
    @Query(() => [GroupMember])
    async getGroupMembers(
        @Arg("groupId", () => Int) groupId: number
    ): Promise<GroupMember[]> {
        const members = await getConnection().query(`
        select gm."isAdmin", json_build_object(
            'id', u.id,
            'username', u.username
        ) "member"
        from "groupMembers" gm
        inner join "users" u on u.id = gm."memberId"
        where gm."groupId" = $1;
        `, [groupId]);

        // console.log("members: ", members);

        return members;
    }

    @Query(() => Group, { nullable: true })
    async getGroup(
        @Arg("groupId", () => Int) groupId: number
    ): Promise<Group | undefined> {
        const group = await Group.findOne({ where: { id: groupId }, relations: ["posts", "posts.author"] });

        // const group = await getConnection().query(`
        // SELECT 
        // [type] = 'FeatureCollection',
        // [features] = JSON_QUERY((
        //     select top 10 
        //         'Feature' as [type], 
        //         m.Id as id, m.Address as 'properties.address',
        //         'Point' as 'geometry.type',
        //         JSON_QUERY('[' + m.location + ']') as 'geometry.coordinates'
        //     from 
        //         Buildings m
        //     where 
        //         m.Location is not null 
        //         and m.Location <> ''
        //     for json path   
        // ))
        // FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        // `, [groupId]);

        // const group = await getConnection().query(`
        // select p.*
        // json_build
        // `);

        // console.log("group", group);

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
            'name', g.name,
            'description', g.description
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
        @Arg("description") description: string,
        @Ctx() { req }: ContextType
    ): Promise<boolean> {
        await getConnection().transaction(async t => {
            const newGroup = Group.create({
                name: groupName,
                description
            });

            await t.save(newGroup);

            console.log("New group: ", newGroup);

            await t.query(`
            insert into "groupMembers" ("isAdmin", "memberId", "groupId") values (true, $1, $2)
            `, [req.session.userId, newGroup.id]);
        });

        return true;
    }
}