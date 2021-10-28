import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export class Lesson {
    @Column() week: string;
    @Column() date: string;
    @Column() day: string;
    @Column() group: string;
    @Column() teachers: string[];
    @Column() lessonName: string;
    @Column() lessonType: string;
    @Column() classRoom: string;
    @Column() time: string;
}

@Entity()
export default class WeekSchedule {
    @ObjectIdColumn() _id: ObjectID;
    @Column() group: string;
    @Column(() => Lesson) lessons: Lesson;
}