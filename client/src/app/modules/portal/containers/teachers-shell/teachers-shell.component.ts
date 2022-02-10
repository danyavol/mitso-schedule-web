import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Lesson, Week } from '@modules/portal/interfaces/portal.interface';
import { PortalApiService } from '@modules/portal/services/portal-api.service';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'teachers-shell',
    templateUrl: './teachers-shell.component.html',
    styleUrls: ['./teachers-shell.component.scss']
})
export class TeachersShellComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        teacherSearch: '',
        teacher: null,
        week: null
    });
    public teachers$: Observable<string[]>;
    public weeks$: Observable<Week[]>;
    public lessons$: Observable<Lesson[]>;
    public isLoading = false;

    private teacherSearchChange$ = this.form.get('teacherSearch').valueChanges;
    private teacherChange$ = this.form.get('teacher').valueChanges;
    private weekChange$ = this.form.get('week').valueChanges;

    constructor(
        private fb: FormBuilder,
        private portalApi: PortalApiService
    ) { }

    ngOnInit(): void {
        this.lessons$ = this.getScheduleObs();
        this.teachers$ = this.getTeachersObs();
        this.weeks$ = this.getWeeksObs();
    }

    private getTeachersObs(): Observable<string[]> {
        return combineLatest([
            this.teacherSearchChange$.pipe(startWith(this.form.get('teacherSearch').value)),
            this.portalApi.getTeachers()
        ]).pipe(
            map(([search, teachers]) => {
                const searchString = search.toLowerCase().trim();
                return teachers.filter(teachers => teachers.toLowerCase().includes(searchString));
            })
        );
    }

    private getWeeksObs(): Observable<Week[]> {
        return this.portalApi.getAvailableWeeks().pipe(
            tap((data) => {
                this.form.get('week').setValue(data[0]?.collection);
            })
        );
    }

    private getScheduleObs(): Observable<Lesson[]> {
        return combineLatest([
            this.weekChange$,
            this.teacherChange$
        ]).pipe(
            filter(([collection]) => !!collection),
            tap(() => this.isLoading = true),
            switchMap(([collection, teacher]) => 
                this.portalApi.getTeachersSchedule(collection, teacher)
            ),
            tap(() => this.isLoading = false)
        );
    }

}
