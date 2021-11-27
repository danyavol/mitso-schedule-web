import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CoursesChartData } from '@modules/msw-admin/interfaces/dashboard.interface';
import { DashboardApiService } from '@modules/msw-admin/services/dashboard-api.service';
import {
    ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent
} from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    colors: string[];
    tooltip: ApexTooltip;
};

@Component({
    selector: 'courses-chart',
    templateUrl: './courses-chart.component.html',
    styleUrls: ['./courses-chart.component.scss']
})
export class CoursesChartComponent implements OnInit, OnDestroy {
    @ViewChild("chart", { static: false }) chart: ChartComponent;

    private onDestroy = new Subject();
    public isLoading = false;
    public chartOptions: Partial<ChartOptions>;
    private studentsTotal: number;

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
        this.apiService.getDataForCoursesChart()
            .pipe(
                takeUntil(this.onDestroy),
                finalize(() => this.isLoading = false)
            )
            .subscribe(data => {
                this.studentsTotal = data.total;
                this.setChartData(data);
            });
    }

    private setChartData(data: CoursesChartData): void {
        const mappedData = [ data[1], data[2], data[3], data[4], data[5] ];

        const update: Partial<ChartOptions> = {
            series: [ { data: mappedData } ]
        };

        this.chart.updateOptions(update);
    }

    private setDefaultChartOptions(): void {
        this.chartOptions = {
            series: [ { data: [] } ],
            chart: {
                height: 350,
                type: "bar",
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'top'
                    },
                    borderRadius: 5
                }
            },
            dataLabels: {
                enabled: true,
                formatter: (val: number) => {
                    return `${Math.round(val/this.studentsTotal*1000)/10}% (${val} чел.)`;
                },
                offsetY: -20,
                style: {
                    colors: ['#000']
                }
            },
            stroke: {
                width: 2
            },
            xaxis: {
                categories: [
                    "1 курс",
                    "2 курс",
                    "3 курс",
                    "4 курс",
                    "5 курс"
                ],
                tickPlacement: "on"
            },
            yaxis: {    
                show: false
            },
            title: {
                text: 'Распределение по курсам',
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 500
                }
            },
            colors: ['#00E396'],
            tooltip: {
                enabled: false
            }
        };
    }
}
