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

    @Column()
    @Field()
    description!: string;
    
    // @Column()
    // @Field()
    // icon!: string;

    @OneToMany(() => Post, p => p.group)
    @Field(() => [Post])
    posts: Post[];
    
    @OneToMany(() => GroupMember, gm => gm.group)
    @Field(() => [GroupMember])
    members: GroupMember[];
}