import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Group from "./Group";
import User from "./User";

@Entity({ name: "posts" })
@ObjectType()
export default class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ nullable: false, length: 255 })
    @Field()
    title!: string;

    @Column({ nullable: false })
    @Field()
    text!: string;

    @Column()
    @Field(() => Int)
    authorId!: number;
    @ManyToOne(() => User, u => u.posts)
    @JoinColumn({ name: "authorId" })
    author: User;

    @Column()
    @Field(() => Int)
    groupId!: number;
    @ManyToOne(() => Group, g => g.posts)
    @JoinColumn({ name: "groupId" })
    group: Group;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}