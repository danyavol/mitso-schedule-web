import { DAY, MONTH, TWO_MONTHS, WEEK } from "@constants/time.constant";
import { db } from "@database/database";
import User from "@database/entities/data_db/user.entity";
import { Router } from "express";

const stats = Router();
export default stats;

stats.get('/amount', async (req, res) => {
    const allUsers = await db.UserRepository().find();
    const TODAY = Date.now();
    const uselessUser = (user: User) => (!user.myGroup && !user.balance);

    const result = {
        total: allUsers.length,
        active: allUsers.filter(user => 
                user.lastUseAt.getTime() > TODAY - WEEK
                && !uselessUser(user)
            ).length,
        halfActive: allUsers.filter(user => 
                user.lastUseAt.getTime() > TODAY - TWO_MONTHS 
                && user.lastUseAt.getTime() < TODAY - WEEK
                && !uselessUser(user)
            ).length,
        inactive: allUsers.filter(user => 
                user.lastUseAt.getTime() < TODAY - TWO_MONTHS 
                || uselessUser(user)
            ).length
    };

    res.json(result);
});

stats.get('/amountByCourses', async (req, res) => {
    const allUsers = await db.UserRepository().find();

    const result = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0};
    allUsers.forEach(user => {
        if (user.myGroup?.url) {
            let urlSegments = user.myGroup.url.split('/');
			let course = urlSegments[urlSegments.length-2].split(' ')[0];
            if (parseInt(course) > 0 && parseInt(course) < 6) result[course]++;
        }
    })
	result.total = result[1] + result[2] + result[3] + result[4] + result[5];

    res.json(result);
});

stats.get('/servicesUsage', async (req, res) => {
    const allUsers = await db.UserRepository().find();
    const usersWithBalance = allUsers.filter(u => !!u.balance?.number);
	const usersWithMyGroup = allUsers.filter(u => !!u.myGroup?.group);
    const calcPercentage = (value: number, total: number): number => Math.round(value / total * 100) / 100;

    const result: any = {
        withBalance: {
            value: usersWithBalance.length
        },
        balanceChange: {
            value: usersWithBalance.filter(u => !!u.notifications?.balanceChange).length,
        },
        scheduleChange: {
            value: usersWithMyGroup.filter(u => !!u.notifications?.scheduleChange).length,
        },
        sendDaySchedule: {
            value: usersWithMyGroup.filter(u => !!u.notifications?.daySchedule).length,
        }
    };

    result.withBalance.percentage = calcPercentage(usersWithBalance.length, allUsers.length);
    result.balanceChange.percentage = calcPercentage(result.balanceChange.value, usersWithBalance.length);
    result.scheduleChange.percentage = calcPercentage(result.scheduleChange.value, usersWithMyGroup.length);
    result.sendDaySchedule.percentage = calcPercentage(result.sendDaySchedule.value, usersWithMyGroup.length);

    res.json(result);
});

stats.get('/newUsers', async (req, res) => {
    const allUsers = await db.UserRepository().find();
    const TODAY = Date.now();

    const result = {
        month: allUsers.filter(u => u.createdAt.getTime() > TODAY - MONTH).length,
        week: allUsers.filter(u => u.createdAt.getTime() > TODAY - WEEK).length,
        day: allUsers.filter(u => u.createdAt.getTime() > TODAY - DAY).length
    };

    res.json(result);
});

stats.get('/registrationChart', async (req, res) => {
    const allUsers = await db.UserRepository().find();
    const result = allUsers.map(u => u.createdAt?.toISOString()).filter(value => !!value);
    res.json(result);
})