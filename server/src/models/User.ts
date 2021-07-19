import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import GroupMember from "./GroupMember";
import Post from "./Post";

@Entity({ name: "users" })
@ObjectType()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ nullable: false, unique: true, length: 255 })
    @Field()
    username!: string;

    @Column({ nullable: false })
    password!: string;

    @OneToMany(() => GroupMember, gm => gm.member)
    groups: GroupMember[];

    @OneToMany(() => Post, p => p.author)
    posts: Post[];
}