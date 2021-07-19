import Group from "../models/Group";
import { getConnection } from "typeorm";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import ContextType from "../types/ContextType";
import MustBeAuth from "../middlewares/MustBeAuth";
import FieldError from "../errors/FieldError";
import GroupMember from "../models/GroupMember";

@Resolver(Group)
export default class GroupResolver {
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
            throw new FieldError("groupName", "Group with name " + groupName + " is not found.", "NOT_FOUND");
        }

        if(await GroupMember.findOne({ where: { groupId: group.id, memberId: req.session.userId } })) {
            throw new FieldError("groupName", "You're already a member of this group.", "ALREADY_IN_GROUP");
        }

        await GroupMember.insert({
            groupId: group.id,
            memberId: req.session.userId
        });

        return true;
    }
}

// groupRouter.get("/my-groups", async (req: RequestType, res) => {
//     const userId = req.session.userId;

//     const myGroups = await getConnection().query(`
//     select gm.*,
//     json_build_object(
//     'id', g.id,
//     'name', g.name) "group"
//     from "groupMembers" gm
//     inner join "groups" g on g.id = gm."groupId"
//     where gm."memberId" = $1;
//     `, [userId]);

//     return res.status(200).json({ ok: true, data: myGroups });
// });

// groupRouter.post("/join", async (req: RequestType, res) => {
//     const { groupName } = req.body;

//     if(isNullOrWhitespace(groupName)) {
//         return res.status(400).send({ ok: false, error: { field: "groupName", message: "Group name is required." } });
//     }

//     const group = await Group.findOne({ where: { name: groupName } });

//     if(!group) {
//         return res.status(404).send({ ok: false, error: { field: "groupName", message: "Group with this name is not found." } });
//     }

//     if(await GroupMember.findOne({ where: { groupId: group.id, memberId: req.session.userId } })) {
//         return res.status(404).send({ ok: false, error: { field: "groupName", message: "You're already in this group." } });
//     }

//     const groupMember = GroupMember.create({
//         groupId: group.id,
//         memberId: req.session.userId
//     });

//     await GroupMember.save(groupMember);

//     return res.status(200).json({ ok: true });
// });

// groupRouter.post("/", async (req: RequestType, res) => {
//     const { groupName } = req.body;

//     if(isNullOrWhitespace(groupName)) {
//         return res.status(400).json({ ok: false, error: { field: "groupName", message: "GroupName is required" } });
//     }

//     await getConnection().transaction(async t => {
        
//         const group = Group.create({
//             name: groupName
//         });

//         await t.save(group);

//         await t.query(`
        
//         insert into "groupMembers" ("isAdmin", "groupId", "memberId") values (true, $1, $2);

//         `, [group.id, req.session.userId]);
//     });

//     return res.status(201).json({ ok: true });
// });

// export default groupRouter;