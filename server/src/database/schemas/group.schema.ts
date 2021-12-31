import { Schema } from 'mongoose';

export interface Group {
    group: number;
    url: string;
}

export const groupSchema = new Schema<Group>({
    group: String,
    url: String
});
