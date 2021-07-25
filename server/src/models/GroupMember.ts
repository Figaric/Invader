import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Group from "./Group";
import User from "./User";

@Entity({ name: "groupMembers" })
@ObjectType()
export default class GroupMember extends BaseEntity {
    @Column({ default: false })
    @Field()
    isAdmin: boolean;

    @PrimaryColumn()
    @Field(() => Int)
    memberId: number;
    @ManyToOne(() => User, u => u.groups)
    @JoinColumn({ name: "memberId" })
    @Field(() => User)
    member: User;
    
    @PrimaryColumn()
    @Field(() => Int)
    groupId: number;
    @ManyToOne(() => Group, g => g.members)
    @JoinColumn({ name: "groupId" })
    group: Group;
}