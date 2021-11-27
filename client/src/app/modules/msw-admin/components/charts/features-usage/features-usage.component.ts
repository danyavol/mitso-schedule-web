import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeaturesUsageData } from '@modules/msw-admin/interfaces/dashboard.interface';
import { DashboardApiService } from '@modules/msw-admin/services/dashboard-api.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
    selector: 'features-usage',
    templateUrl: './features-usage.component.html',
    styleUrls: ['./features-usage.component.scss']
})
export class FeaturesUsageComponent implements OnInit, OnDestroy {
    private onDestroy = new Subject();
    public isLoading = false;
    public data: FeaturesUsageData;

    constructor(
        private apiService: DashboardApiService
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    private loadData(): void {
        this.isLoading = true;
        this.apiService.getDataForFeaturesUsage()
            .pipe(
                takeUntil(this.onDestroy),
                finalize(() => this.isLoading = false)
            )
            .subscribe(data => {
                this.data = data;
            });
    }

}
