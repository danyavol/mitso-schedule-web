import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Lesson, ScheduleType } from '@modules/portal/interfaces/portal.interface';

interface MappedSchedule {
    title: string;
    subtitle: string;
    days: {
        date: string,
        day: string,
        lessons: MappedLesson[]
    }[]
}

interface MappedLesson {
    time: string;
    lessonType: string;
    lessonName: string;
    classRoom: string;
    subtitle: string;
}

const PLACEHOLDER_MSG = {
    [ScheduleType.Group]: 'Выберите группу и неделю, чтобы посмотреть расписание',
    [ScheduleType.Teacher]: 'Выберите преподавателя и неделю, чтобы посмотреть его расписание'
};

const ERROR_MSG = {
    [ScheduleType.Group]: 'Расписание данной группы не найдено',
    [ScheduleType.Teacher]: 'Расписание преподавателя на выбранную неделю не найдено'
};
@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnChanges {
    @Input() lessons: Lesson[];
    @Input() type: ScheduleType = ScheduleType.Group;
    @Input() teacherName: string;
    @Input() isError: boolean = false;
    
    public mappedSchedule: MappedSchedule;
    public PLACEHOLDER_MSG = PLACEHOLDER_MSG;
    public ERROR_MSG = ERROR_MSG;
    public ScheduleType = ScheduleType;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.lessons?.currentValue) {
            switch(this.type) {
                case ScheduleType.Group:
                    this.mappedSchedule = this.mapGroupSchedule(this.lessons);
                    break;
                case ScheduleType.Teacher:
                    this.mappedSchedule = this.mapTeacherSchedule(this.lessons);
                    break;
            }
        }
    }

    private mapTeacherSchedule(lessons: Lesson[]): MappedSchedule {
        const result: MappedSchedule = {
            title: '',
            subtitle: '',
            days: []
        };
        if (lessons?.length) {
            result.title = this.teacherName;
            result.subtitle = lessons[0].week;

            lessons.reduce((accumulator, lesson, index) => {
                if (lesson.date === accumulator.date) {
                    const lastSavedLesson: MappedLesson = accumulator.lessons.length ? 
                        accumulator.lessons[accumulator.lessons.length-1] : null;

                    if (lastSavedLesson?.time === lesson.time) {
                        lastSavedLesson.subtitle += `, ${lesson.group}`
                    } else {
                        accumulator.lessons.push(this.mapTeacherLesson(lesson));
                    }
                } else {
                    result.days.push(accumulator);
                    accumulator = {
                        date: lesson.date,
                        day: lesson.day,
                        lessons: [this.mapTeacherLesson(lesson)]
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

    private mapGroupSchedule(lessons: Lesson[]): MappedSchedule {
        const result: MappedSchedule = {
            title: '',
            subtitle: '',
            days: []
        };
        if (lessons?.length) {
            result.title = lessons[0].group;
            result.subtitle = lessons[0].week;

            lessons.reduce((accumulator, lesson, index) => {
                if (lesson.date === accumulator.date) {
                    accumulator.lessons.push(this.mapGroupLesson(lesson));
                } else {
                    result.days.push(accumulator);
                    accumulator = {
                        date: lesson.date,
                        day: lesson.day,
                        lessons: [this.mapGroupLesson(lesson)]
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

    private mapGroupLesson(lesson: Lesson): MappedLesson {
        return {
            lessonName: lesson.lessonName,
            classRoom: lesson.classRoom,
            lessonType: lesson.lessonType,
            subtitle: lesson.teachers.join(', '),
            time: lesson.time
        };
    }

    private mapTeacherLesson(lesson: Lesson): MappedLesson {
        return {
            lessonName: lesson.lessonName,
            classRoom: lesson.classRoom,
            lessonType: lesson.lessonType,
            subtitle: lesson.group,
            time: lesson.time
        };
    }

}
