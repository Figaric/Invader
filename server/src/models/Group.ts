import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import GroupMember from "./GroupMember";
import Post from "./Post";

@Entity({ name: "groups" })
@ObjectType()
export default class Group extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int, { nullable: true })
    id: number;

    @Column()
    @Field({ nullable: true })
    name!: string;

    @OneToMany(() => Post, p => p.group)
    posts: Post[];
    
    @OneToMany(() => GroupMember, gm => gm.group)
    members: GroupMember[];
}