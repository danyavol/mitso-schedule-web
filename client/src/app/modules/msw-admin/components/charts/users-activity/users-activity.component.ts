import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersActivityData } from '@modules/msw-admin/interfaces/dashboard.interface';
import { DashboardApiService } from '@modules/msw-admin/services/dashboard-api.service';
import { ApexAxisChartSeries, ApexChart, ApexGrid, ApexPlotOptions, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    colors: string[];
    tooltip: ApexTooltip;
    grid: ApexGrid;
};

@Component({
    selector: 'users-activity',
    templateUrl: './users-activity.component.html',
    styleUrls: ['./users-activity.component.scss']
})
export class UsersActivityComponent implements OnInit, OnDestroy {
    @ViewChild("chart", { static: false }) chart: ChartComponent;
    
    private onDestroy = new Subject();
    public isLoading = false;
    public chartOptions: Partial<ChartOptions>;

    constructor(
        private apiService: DashboardApiService
    ) {}

    ngOnInit(): void {
        this.setDefaultChartOptions();
        this.loadData();
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    private loadData(): void {
        this.isLoading = true;
        this.apiService.getUsersActivity()
            .pipe(
                takeUntil(this.onDestroy),
                finalize(() => this.isLoading = false)
            )
            .subscribe(data => {
                this.setChartData(data);
            });
    }

    private setChartData(data: UsersActivityData): void {
        const update: Partial<ChartOptions> = {
            series: [
                {
                    name: 'Активные',
                    data: [data.active]
                },
                {
                    name: 'Полуактивные',
                    data: [data.halfActive]
                },
                {
                    name: 'Неактивные',
                    data: [data.inactive]
                },
            ]
        };

        this.chart.updateOptions(update);
    }

    private setDefaultChartOptions(): void {
        this.chartOptions = {
            series: [],
            chart: {
                type: 'bar',
                height: 120,
                stacked: true,
                stackType: '100%',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                  horizontal: true,
                }
            },
            xaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            title: {
                text: 'Активность пользователей',
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 500
                }
            },
            colors: ['#00E396', '#FEB019', '#FA4443'],
            tooltip: {
                enabled: false
            },
            grid: {
                show: false
            }
        }
    }

}
