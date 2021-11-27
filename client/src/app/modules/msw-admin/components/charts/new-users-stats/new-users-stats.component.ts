import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewUsersData } from '@modules/msw-admin/interfaces/dashboard.interface';
import { DashboardApiService } from '@modules/msw-admin/services/dashboard-api.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'new-users-stats',
    templateUrl: './new-users-stats.component.html',
    styleUrls: ['./new-users-stats.component.scss']
})
export class NewUsersStatsComponent implements OnInit, OnDestroy {

    private onDestroy = new Subject();
    public isLoading = false;
    public data: NewUsersData;

    constructor(
        private apiService: DashboardApiService
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    private loadData(): void {
        this.isLoading = true;
        this.apiService.getNewUsersData()
            .pipe(
                takeUntil(this.onDestroy),
                finalize(() => this.isLoading = false)
            )
            .subscribe(data => {
                this.data = data;
            });
    }

}
