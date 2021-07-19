import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Group from "./Group";
import User from "./User";

@Entity({ name: "groupMembers" })
export default class GroupMember extends BaseEntity {
    @Column({ default: false })
    isAdmin: boolean;

    @PrimaryColumn()
    memberId: number;
    @ManyToOne(() => User, u => u.groups)
    @JoinColumn({ name: "memberId" })
    member: User;
    
    @PrimaryColumn()
    groupId: number;
    @ManyToOne(() => Group, g => g.members)
    @JoinColumn({ name: "groupId" })
    group: Group;
}