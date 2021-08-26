import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BetterEntity from "./BetterEntity";
import Group from "./Group";
import User from "./User";

@Entity({ name: "posts" })
@ObjectType()
export default class Post extends BetterEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Field()
    @Column({ nullable: false, length: 255 })
    title!: string;

    @Column({ nullable: false })
    @Field()
    text!: string;

    @Column()
    @Field(() => Int)
    authorId!: number;
    @Field(() => User)
    @ManyToOne(() => User, u => u.posts)
    @JoinColumn({ name: "authorId" })
    author: User;

    @Column()
    @Field(() => Int)
    groupId!: number;
    @Field(() => Group)
    @ManyToOne(() => Group, p => p.posts)
    @JoinColumn({ name: "groupId" })
    group: Group;
}