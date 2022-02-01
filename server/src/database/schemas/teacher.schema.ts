import { Schema } from 'mongoose';

export interface Teacher {
    name: string;
}

export const teacherSchema = new Schema<Teacher>({
    name: String
});
