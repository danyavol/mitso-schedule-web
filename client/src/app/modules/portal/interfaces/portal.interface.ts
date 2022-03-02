export interface Week {
    collection: string;
    name: string;
}

export interface Lesson {
    week: string;
    date: string;
    day: string;
    group: string;
    teachers: string[],
    lessonName: string;
    lessonType: string;
    classRoom: string;
    time: string;
}

export enum ScheduleType {
    Group,
    Teacher
}

export interface BalanceResponse {
    error?: string;
    data: {
        balance: number;
        dolg: number;
        penia: number;
        date: string;
        personStatus: string;
        personName: string;
    }
}