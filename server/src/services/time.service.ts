export const MonthFormatter = {
    toString(monthNumber: string | number): string {
        const month = appendZero(monthNumber);
        switch (month) {
            case '01': return 'января';
            case '02': return 'февраля';
            case '03': return 'марта';
            case '04': return 'апреля';
            case '05': return 'мая';
            case '06': return 'июня';
            case '07': return 'июля';
            case '08': return 'августа';
            case '09': return 'сентября';
            case '10': return 'октября';
            case '11': return 'ноября';
            case '12': return 'декабря';
        }
        throw Error(`Error at MonthFormatter.toString: Could not parse month number '${monthNumber}'`);
    },
    toNumber(monthName: string): number {
        switch (monthName.slice(0,-1)) {
            case 'январ': return 1;
            case 'феврал': return 2;
            case 'март': return 3;
            case 'мар': return 3;
            case 'апрел': return 4;
            case 'ма': return 5;
            case 'июн': return 6;
            case 'июл': return 7;
            case 'август': return 8;
            case 'сентябр': return 9;
            case 'октябр': return 10;
            case 'ноябр': return 11;
            case 'декабр': return 12;
        }
        throw Error(`Error at MonthFormatter.toNumber: Could not parse month name '${monthName}'`);
    }
};

export const DateFormatter = {
    toShortString(date: Date): string {
        const day = appendZero(date.getDate());
        const month = appendZero(date.getMonth()+1);
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    },
    toCollectionName(date: Date): string {
        const day = appendZero(date.getDate());
        const month = appendZero(date.getMonth()+1);
        const year = date.getFullYear();
        return `${year}${month}${day}`;
    }
};

export const DateStringFormatter = {
    toCollectionName(dateString: string): string {
        const [day, month] = dateString.split('-')[0].split(' ');

        const now = new Date();
        let nowYear = now.getFullYear();
        const scheduleMonth = MonthFormatter.toNumber(month);
        const nowMonth = now.getMonth()+1;

        // Проверка какой год нужно возвращать
        // Если сейчас октябрь-декабрь, а расписание на январь+, год увеличивается на 1
        if (nowMonth > 9 && scheduleMonth < 4) nowYear++;
        // Если сейчас январь-март, а расписание на ноябрь-декабрь, год уменьшаем на 1
        if (nowMonth < 4 && scheduleMonth > 9) nowYear--;

        const date = new Date(`${nowYear}-${appendZero(month)}-${appendZero(day)}`);

        return DateFormatter.toCollectionName(date);
    },
    toShortDate(dateString: string): string {
        const [day, month] = dateString.split(' ');
        return `${appendZero(day)}.${appendZero(MonthFormatter.toNumber(month))}`;
    },
    getLessonTime(date: string, time: string = "8:00-9:20"): number {
        const [day, month] = date.split(' ');
        const [hours, minutes] = time.split('-')[0].split(/\.|:/);
    
        const monthNumber = MonthFormatter.toNumber(month);
    
        const now = getMinskDate();
        now.setFullYear(predictYear(monthNumber), monthNumber - 1, +day);
        now.setHours(+hours, +minutes, 0, 0);
    
        return now.getTime();
    }
}

export const CollectionFormatter = {
    toLongString(collection: string | number): string {
        const collectionName = '' + collection;

        const year = collectionName.slice(0, 4);
        const month = MonthFormatter.toString(collectionName.slice(4, 6));
        const day = collectionName.slice(6);

        return `${day} ${month} ${year}`;
    },
    toShortPeriod(collection: string | number): string {
        const collectionName = '' + collection;

        const slicedDate = [
            collectionName.slice(0, 4),
            collectionName.slice(4, 6),
            collectionName.slice(6)
        ];
        const startDate = new Date(slicedDate.join('-'));
        const endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 5);
    
        return DateFormatter.toShortString(startDate) + ' - ' + DateFormatter.toShortString(endDate);
    },
    
};

export function selectWeek(weekIncrement: number = 0, currentDate: Date = null): string {
    const ONE_DAY = 1000 * 60 * 60 * 24;

	let now = currentDate || new Date();

	now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()+3);

	if (now.getDay() === 0) {
		if (currentDate) 
            now = new Date(now.getTime() - ONE_DAY * 6);
		else 
            now = new Date(now.getTime() + ONE_DAY);
	}
	else if (now.getDay() > 1) {
		now = new Date(now.getTime() - (now.getDay() - 1) * ONE_DAY)
	}

	now = new Date(now.getTime() + (ONE_DAY * 7) * weekIncrement);

	return DateFormatter.toCollectionName(now);
}

export function getWeekTitle (collectionName: string, archive = false): string {
	let weekIncrement = 0;
	if (!archive)
		while(selectWeek(weekIncrement) !== collectionName && weekIncrement < 20) weekIncrement++;
	else
		return CollectionFormatter.toLongString(collectionName);

	if (weekIncrement === 0) return 'Текущая неделя';
	return weekIncrement+1 + ' неделя';
};



function appendZero(number: string | number): string {
    if (
        (typeof number === 'string' && number.length == 1) 
        || (typeof number === 'number' && number < 10)
    ) {
        return '0' + number;
    }
    return '' + number;
}

function getMinskDate(): Date {
	const timeZone = 3;
	let now = new Date();
	if (now.getTimezoneOffset() / 60 !== -timeZone) {
		let offset = timeZone * 60 + now.getTimezoneOffset();
		now = new Date(now.getTime() + offset*1000*60);
	}
	return now;
}

function predictYear(month: string | number): number {
    const nowMonth = new Date().getMonth() + 1;
    let nowYear = new Date().getFullYear();

    // Если сейчас октябрь-декабрь, а расписание на январь+, год увеличивается на 1
    if (nowMonth > 9 && parseInt(String(month)) < 4) return nowYear++;
    // Если сейчас январь-март, а расписание на ноябрь-декабрь, год уменьшаем на 1
    if (nowMonth < 4 && parseInt(String(month)) > 9) return nowYear--;

    return nowYear;
}