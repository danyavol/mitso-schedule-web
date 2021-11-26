import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RegistrationChartData } from '@modules/msw-admin/interfaces/dashboard.interface';
import { DashboardApiService } from '@modules/msw-admin/services/dashboard-api.service';
import {
    ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ChartComponent
} from "ng-apexcharts";
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    xaxis: ApexXAxis;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'registrations-chart',
    templateUrl: './registrations-chart.component.html',
    styleUrls: ['./registrations-chart.component.scss']
})
export class RegistrationsChartComponent implements OnInit, OnDestroy {
    @ViewChild("chart", { static: false }) chart: ChartComponent;

    private onDestroy = new Subject();
    public isLoading = false;
    public chartOptions: Partial<ChartOptions>;

    constructor(
        private apiService: DashboardApiService,
    ) { }

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
        this.apiService.getDataForRegistrationsChart()
            .pipe(
                takeUntil(this.onDestroy),
                finalize(() => this.isLoading = false)
            )
            .subscribe(data => {
                this.setChartData(data);
            });
    }

    private setChartData(data: RegistrationChartData): void {
        const update: Partial<ChartOptions> = {
            series: [ { data } ],
            xaxis: {
                min: new Date(data[0][0]).getTime()
            }
        };

        this.chart.updateOptions(update);
    }

    private setDefaultChartOptions(): void {
        this.chartOptions = {
            series: [],
            chart: {
                type: "area",
                height: 350,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            title: {
                text: 'Количество пользователей',
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 500
                }
            },
            xaxis: {
                type: "datetime",
                labels: {
                    formatter: (_value, timestamp) => {
                        const date = new Date(timestamp);
                        return new Intl.DateTimeFormat(navigator.language, {month: 'long', year: 'numeric'}).format(date);
                    }
                }
            },
            tooltip: {
                x: {
                    formatter: (date) => new Date(date).toLocaleDateString()
                },
                y: {
                    title: {
                        formatter: () => 'Пользователей:'
                    }
                }
            }
        };
    }

}
