import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export enum TimeTypes {
    Relative = 'relative',
    Exactly = 'exactly'
}

export class DayScheduleTime {
    @ObjectIdColumn() _id: ObjectID;
    @Column({ type: "enum", enum: TimeTypes }) time: TimeTypes;
    @Column() hours: number;
    @Column() minutes: number;
}

export class UserNotifications {
    @Column() scheduleChange: boolean;
    @Column() daySchedule: boolean;
    @Column() balanceChange: boolean;
}

export class UserBalance {
    @Column() number: number;
    @Column() balance: number;
    @Column() dolg: number;
    @Column() penia: number;
}

export class UserGroup {
    @Column() group: string;
    @Column() url: string;
}


@Entity('users')
export default class User {
    @ObjectIdColumn() _id: ObjectID;
    @Column() id: number;
    @Column() firstName: string;
    @Column() lastName: string;
    @Column() username: string;
    @Column() isBot: boolean;
    @Column() language: string;
    @Column() lastUseAt: Date;
    @Column() createdAt: Date;
    @Column(() => DayScheduleTime) dayScheduleTime: DayScheduleTime[];
    @Column(() => UserNotifications) notifications: UserNotifications;
    @Column(() => UserBalance) balance: UserBalance;
    @Column(() => UserGroup) myGroup: UserGroup;
}

