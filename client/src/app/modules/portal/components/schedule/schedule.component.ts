import { Component, Input, OnChanges } from '@angular/core';
import { Lesson } from '@modules/portal/interfaces/portal.interface';

interface MappedLessons {
    title: { group: string, week: string };
    days: {
        date: string,
        day: string,
        lessons: Lesson[]
    }[]
}

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnChanges {
    @Input() lessons: Lesson[];
    
    public mappedLessons: MappedLessons;

    ngOnChanges(): void {
        this.mappedLessons = this.mapLessons(this.lessons);
    }

    public mapLessons(lessons: Lesson[]): MappedLessons {
        const result: MappedLessons = {
            title: null,
            days: []
        };
        if (lessons?.length) {
            result.title = {
                group: lessons[0].group,
                week: lessons[0].week
            };

            lessons.reduce((accumulator, lesson, index) => {
                if (lesson.date === accumulator.date) {
                    accumulator.lessons.push(lesson);
                } else {
                    result.days.push(accumulator);
                    accumulator = {
                        date: lesson.date,
                        day: lesson.day,
                        lessons: [lesson]
                    };
                }

                if (index === lessons.length - 1) {
                    result.days.push(accumulator);
                }

                return accumulator;
            }, {
                date: lessons[0].date,
                day: lessons[0].day,
                lessons: []
            });
        }
        return result;
    }

}
