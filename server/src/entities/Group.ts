import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BetterEntity from "./BetterEntity";
import GroupMember from "./GroupMember";
import Post from "./Post";

@Entity({ name: "groups" })
@ObjectType()
export default class Group extends BetterEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Field()
    @Column({ nullable: false, unique: true, length: 255 })
    name!: string;

    @Field()
    @Column({ nullable: false })
    description!: string;

    @OneToMany(() => Post, p => p.group)
    posts: Post[];

    @OneToMany(() => GroupMember, gm => gm.group)
    members: GroupMember[];
}