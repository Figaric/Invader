import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Group from "./Group";
import User from "./User";

@Entity({ name: "posts" })
export default class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 255 })
    title!: string;

    @Column({ nullable: false })
    text!: string;

    @Column()
    authorId!: number;
    @ManyToOne(() => User, u => u.posts)
    @JoinColumn({ name: "authorId" })
    author: User;

    @Column()
    groupId!: number;
    @ManyToOne(() => Group, g => g.posts)
    @JoinColumn({ name: "groupId" })
    group: Group;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}