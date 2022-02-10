import { WEEK_DAYS } from "@constants/time.constant";
import { db } from "@database/database";
import { DateStringFormatter } from "@services/time.service";
import { Router } from "express";

const classroom = Router();
export default classroom;

classroom.get('/:collection/:day/:classroom', async (req, res) => {
    const { collection, day, classroom,  } = req.params;
    
    const schedule = await db.Schedule(collection).find();

    const filteredSchedule = [];
    schedule.forEach(group => {
        const filteredLessons = group.lessons.filter(lesson =>
            lesson.classRoom.includes(classroom)
            && lesson.day === WEEK_DAYS[day]
        );
        filteredSchedule.push(...filteredLessons);
    });

    filteredSchedule.sort((a, b) => DateStringFormatter.getLessonTime(a.date, a.time) - DateStringFormatter.getLessonTime(b.date, b.time) );

    res.json(filteredSchedule);
});