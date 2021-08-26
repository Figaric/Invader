import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BetterEntity from "./BetterEntity";
import GroupMember from "./GroupMember";
import Post from "./Post";

@Entity({ name: "users" })
@ObjectType()
export default class User extends BetterEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ nullable: false, unique: true, length: 255 })
    @Field()
    username!: string;

    @Column({ nullable: false, unique: true })
    @Field()
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @OneToMany(() => Post, p => p.author)
    posts: Post[];

    @OneToMany(() => GroupMember, gm => gm.member)
    groups: GroupMember[];
}