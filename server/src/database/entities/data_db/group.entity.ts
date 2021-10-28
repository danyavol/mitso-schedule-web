import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('groups')
export default class Group {
    @ObjectIdColumn() _id: ObjectID;
    @Column() group: string;
    @Column() url: string;
}