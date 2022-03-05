import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Lesson, Week } from '@modules/portal/interfaces/portal.interface';
import { PortalApiService } from '@modules/portal/services/portal-api.service';
import { GroupedGroupsFromApi } from '@shared/interfaces/lookup.interface';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'schedule-shell',
    templateUrl: './schedule-shell.component.html',
    styleUrls: ['./schedule-shell.component.scss'],
})
export class ScheduleShellComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        groupSearch: '',
        group: null,
        week: null
    });
    public groups$: Observable<GroupedGroupsFromApi>;
    public weeks$: Observable<Week[]>;
    public schedule$: Observable<Lesson[]>;
    public isLoading = false;
    public isError = false;

    private groupSearchChange$ = this.form.get('groupSearch').valueChanges;
    private groupChange$ = this.form.get('group').valueChanges;
    private weekChange$ = this.form.get('week').valueChanges;

    constructor(
        private fb: FormBuilder,
        private portalApi: PortalApiService
    ) { }
    

    ngOnInit(): void {
        this.groups$ = this.getGroupsObs();
        this.weeks$ = this.getWeeksObs();
        this.schedule$ = this.getScheduleObs();
    }

    private getGroupsObs(): Observable<GroupedGroupsFromApi> {
        return combineLatest([
            this.groupSearchChange$.pipe(startWith(this.form.get('groupSearch').value)),
            this.portalApi.getGroups()
        ]).pipe(
            map(([search, courses]) => {
                const result = [];
                courses.forEach(course => {
                    const filteredGroups = course.items.filter(group => group.group.includes(search));
                    if (filteredGroups.length) {
                        result.push({
                            label: course.label,
                            items: filteredGroups
                        });
                    }
                });
                return result;
            })
        );
    }

    private getWeeksObs(): Observable<Week[]> {
        return this.groupChange$.pipe(
            debounceTime(200),
            distinctUntilChanged((a, b) => a === b),
            switchMap((group) =>
                this.portalApi.getAvailableWeeks(group)
            ),
            tap((data) => {
                this.form.get('week').setValue(data[0]?.collection);
            })
        );
    }

    private getScheduleObs(): Observable<Lesson[]> {
        return this.weekChange$.pipe(
            withLatestFrom(this.groupChange$),
            filter(([collection]) => !!collection),
            debounceTime(200),
            tap(() => {
                this.isLoading = true;
                this.isError = false;
            }),
            switchMap(([collection, group]) => 
                this.portalApi.getSchedule(collection, group).pipe(
                    catchError(() => {
                        this.isError = true;
                        return of([]);
                    })
                )
            ),
            tap(() => this.isLoading = false)
        );
    }

}
