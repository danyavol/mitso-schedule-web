import { db } from "@database/database";
import { DateStringFormatter } from "@services/time.service";
import { Router } from "express";

const teachers = Router();
export default teachers;


teachers.get('/', async (req, res) => {
    const allTeachers = (await db.Teacher.find().sort({ name: 1})).map(teacher => teacher.name);
    res.json( allTeachers );
});

teachers.get('/:collection/:teacher', async (req, res) => {
    const { collection, teacher } = req.params;
    
    const schedule = await db.Schedule(collection).find();

    const filteredSchedule = [];
    schedule.forEach(group => {
        const filteredLessons = group.lessons.filter(lesson =>
            lesson.teachers.includes(teacher)
        );
        filteredSchedule.push(...filteredLessons);
    });

    filteredSchedule.sort((a, b) => DateStringFormatter.getLessonTime(a.date, a.time) - DateStringFormatter.getLessonTime(b.date, b.time) );

    res.json(filteredSchedule);
});