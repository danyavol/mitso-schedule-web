import { db } from "@database/database";
import { Router } from "express";

const teachers = Router();
export default teachers;


teachers.get('/', async (req, res) => {
    const allTeachers = (await db.Teacher.find().sort({ name: 1})).map(teacher => teacher.name);
    res.json( allTeachers );
});