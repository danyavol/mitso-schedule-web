import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupedGroupsFromApi, GroupFromApi, UserFromApi } from '@modules/msw-admin/interfaces/users.interface';
import { UsersApiService } from '@modules/msw-admin/services/users-api.service';
import { Subject } from 'rxjs';
import { finalize, startWith, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'edit-user-modal',
    templateUrl: './edit-user-modal.component.html',
    styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit, OnDestroy {

    public user: UserFromApi;
    public groupedGroups: GroupedGroupsFromApi;
    public formGroup: FormGroup;
    public isLoading = false;
    private onDestroy = new Subject();

    constructor(
        fb: FormBuilder,
        private dialogRef: MatDialogRef<EditUserModalComponent>,
        private apiService: UsersApiService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.user = data;

        this.formGroup = fb.group({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            username: this.user.username,
            balanceNumber: this.user.balance?.number,
            groupNumber: this.user.myGroup?.group,
            notifications: fb.group({
                balanceChange: this.user.notifications?.balanceChange,
                scheduleChange: this.user.notifications?.scheduleChange,
                daySchedule: this.user.notifications?.daySchedule,
            }),
            dayScheduleTime: [this.user.dayScheduleTime]
        });
    }

    ngOnInit(): void {
        this.loadGroups();

        this.formGroup.get('firstName').disable();
        this.formGroup.get('lastName').disable();
        this.formGroup.get('username').disable();



        this.formGroup.get('balanceNumber').valueChanges
            .pipe( takeUntil(this.onDestroy), startWith(this.formGroup.get('balanceNumber').value) )
            .subscribe(value => {
                if (value) {
                    this.formGroup.get('notifications.balanceChange').enable();
                } else {
                    this.formGroup.get('notifications.balanceChange').disable();
                }
            });

        this.formGroup.get('groupNumber').valueChanges
            .pipe( takeUntil(this.onDestroy), startWith(this.formGroup.get('groupNumber').value) )
            .subscribe(value => {
                if (value) {
                    this.formGroup.get('notifications.scheduleChange').enable();
                    this.formGroup.get('notifications.daySchedule').enable();
                } else {
                    this.formGroup.get('notifications.scheduleChange').disable();
                    this.formGroup.get('notifications.daySchedule').disable();
                }
            });
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    public save(): void {
        this.close();
    }

    public close(): void {
        this.dialogRef.close();
    }

    public get hasBalance(): boolean {
        return !!this.formGroup.get('balanceNumber').value;
    }

    public get hasGroup(): boolean {
        return !!this.formGroup.get('groupNumber').value;
    }

    private loadGroups(): void {
        this.isLoading = true;
        this.apiService.getGroups()
            .pipe(
                takeUntil(this.onDestroy),
                finalize(() => this.isLoading = false)
            )
            .subscribe((groups) => {
                this.groupedGroups = groups;
            })
    }

}
