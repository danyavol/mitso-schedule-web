import { Schema } from 'mongoose';

export enum TimeTypes {
    Relative = 'relative',
    Exactly = 'exactly'
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    isBot: boolean;
    language: string;
    lastUseAt: Date;
    createdAt: Date;
    myGroup: {
        group: string;
        url: string;
    },
    dayScheduleTime: {
        time: TimeTypes;
        hours: number;
        minutes: number;
    }[],
    balance: {
        number: number;
        balance: number;
        dolg: number;
        penia: number;
    },
    notifications?: {
        scheduleChange?: boolean;
		balanceChange?: boolean;
		daySchedule?: boolean;
    }
}

export const userSchema = new Schema<User>({
	id: Number,
	firstName: String,
	lastName: String,
	username: String,
	isBot: Boolean,
	language: String,
	lastUseAt: Date,
    createdAt: Date,
	myGroup: {
		group: String,
		url: String
	},
	dayScheduleTime: [{
			time: String,
			hours: Number,
			minutes: Number
	}],
	balance: {
		number: Number,
		balance: Number,
		dolg: Number,
		penia: Number
	},
	notifications: {
		scheduleChange: Boolean,
		balanceChange: Boolean,
		daySchedule: Boolean
	}
});
