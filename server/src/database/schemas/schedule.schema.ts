import { Schema } from 'mongoose';

export interface Schedule {
    group: string;
    lessons: {
        week: string;
        date: string;
        day: string;
        group: string;
        teachers: string[];
        lessonName: string;
        lessonType: string;
        classRoom: string;
        time: string;
    }[]
}

export const scheduleSchema = new Schema<Schedule>({
    group: String,
    lessons: [{
        week: String,
        date: String,
        day: String,
        group: String,
        teachers: [String],
        lessonName: String,
        lessonType: String,
        classRoom: String,
        time: String
    }]
});
