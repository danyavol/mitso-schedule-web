import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Lesson, Week } from '@modules/portal/interfaces/portal.interface';
import { PortalApiService } from '@modules/portal/services/portal-api.service';
import { GroupedGroupsFromApi } from '@shared/interfaces/lookup.interface';
import { Observable } from 'rxjs';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'schedule',
    templateUrl: './schedule-shell.component.html',
    styleUrls: ['./schedule-shell.component.scss'],
})
export class ScheduleShellComponent implements OnInit {

    public form: FormGroup = this.fb.group({
        group: null,
        week: null
    });
    public groups$: Observable<GroupedGroupsFromApi>;
    public weeks$: Observable<Week[]>;
    public schedule$: Observable<Lesson[]>;
    public isLoading = false;

    private groupChange$ = this.form.get('group').valueChanges;
    private weekChange$ = this.form.get('week').valueChanges;

    constructor(
        private fb: FormBuilder,
        private portalApi: PortalApiService
    ) { }
    

    ngOnInit(): void {
        this.groups$ = this.portalApi.getGroups();
        this.weeks$ = this.getWeeksObs();
        this.schedule$ = this.getScheduleObs();
    }

    private getWeeksObs(): Observable<Week[]> {
        return this.groupChange$.pipe(
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
            tap(() => this.isLoading = true),
            switchMap(([collection, group]) => 
                this.portalApi.getSchedule(collection, group)
            ),
            tap(() => this.isLoading = false)
        );
    }

}
