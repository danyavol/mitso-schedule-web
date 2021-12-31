

import { db } from "@database/database";
import { Router } from "express";

const groups = Router();
export default groups;


groups.get('/', async (req, res) => {
    const { grouped } = req.query;
    const allGroups = await db.Group.find();
    
    allGroups
        .sort((a, b) => {
            const valueA = a.url.split('/')[7];
            const valueB = b.url.split('/')[7];
            if (valueA > valueB) return 1;
            else if (valueA < valueB) return -1;
            else return 0;
        })
        .sort((a, b) => {
            const valueA = a.url.split('/')[6];
            const valueB = b.url.split('/')[6];
            if (valueA > valueB) return 1;
            else if (valueA < valueB) return -1;
            else return 0;
        });
    if (grouped === 'true') {
        const groups = [];
        let currentCourse = 1, currentGroups = [];
        allGroups.forEach(g => {
            if (+g.url.split('/')[6][0] === currentCourse) {
                currentGroups.push(g);
            } else {
                groups.push({ label: currentCourse + ' курс', items: currentGroups});
                currentCourse = +g.url.split('/')[6][0];
                currentGroups = [];
            }
        });
        groups.push({ label: currentCourse + ' курс', items: currentGroups});
        return res.json( groups );
    } else {
        res.json( allGroups );
    }
    
});