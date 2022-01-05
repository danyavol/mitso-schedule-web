import { db, schedule_conn } from "@database/database";
import { getWeekTitle, selectWeek } from "@services/time.service";
import { Router } from "express";

const schedule = Router();
export default schedule;

schedule.get('/weeks', async (req, res) => {
    const { group } = req.query;

    const allCollections = await schedule_conn.db.listCollections().toArray();
    const currentWeek = selectWeek(0);
    const actualCollection = allCollections.filter(c => +c.name >= +currentWeek);

    const weeks: { collection: string, name: string }[] = [];

    if (group) {
        const promises = actualCollection.map(collection => 
            db.Schedule(collection.name).findOne({ group }).then(data => {
                if (data?.lessons?.length)
                    weeks.push({ 
                        collection: collection.name, 
                        name: getWeekTitle(collection.name) 
                    });
            })
        );
        await Promise.all(promises);
    } else {
        weeks.push(
            ...actualCollection.map(col => ({ 
                collection: col.name,
                name: getWeekTitle(col.name)
            }))
        );
    }

    weeks.sort((a, b) => {
        return (+a.collection) - (+b.collection);
    });

    res.json(weeks);
});


schedule.get('/:collection/:group', async (req, res) => {
    const { collection, group } = req.params;

    const schedule = await db.Schedule(collection).findOne({ group });

    res.json(schedule?.lessons);
});
