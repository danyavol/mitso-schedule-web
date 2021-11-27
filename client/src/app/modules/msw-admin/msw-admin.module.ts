import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginShellComponent } from './containers/login-shell/login-shell.component';
import { SharedModule } from '@shared/shared.module';
import { MSWAdminRoutingModule } from './msw-admin-routing.module';
import { MSWAdminShellComponent } from './containers/msw-admin-shell/msw-admin-shell.component';
import { DashboardShellComponent } from './containers/dashboard-shell/dashboard-shell.component';
import { MSWSidebarComponent } from './components/msw-sidebar/msw-sidebar.component';
import { MSWTopbarComponent } from './components/msw-topbar/msw-topbar.component';
import { LoginApiService } from './services/login-api.service';
import { UsersShellComponent } from './containers/users-shell/users-shell.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersApiService } from './services/users-api.service';
import { UsersTableMapService } from './components/users-table/users-table-map.service';
import { RegistrationsChartComponent } from './components/charts/registrations-chart/registrations-chart.component';
import { DashboardApiService } from './services/dashboard-api.service';
import { CoursesChartComponent } from './components/charts/courses-chart/courses-chart.component';
import { FeaturesUsageComponent } from './components/charts/features-usage/features-usage.component';
import { NewUsersStatsComponent } from './components/charts/new-users-stats/new-users-stats.component';
import { UsersActivityComponent } from './components/charts/users-activity/users-activity.component';



@NgModule({
    declarations: [
        LoginShellComponent,
        MSWAdminShellComponent,
        DashboardShellComponent,
        MSWSidebarComponent,
        MSWTopbarComponent,
        UsersShellComponent,
        UsersTableComponent,
        RegistrationsChartComponent,
        CoursesChartComponent,
        FeaturesUsageComponent,
        NewUsersStatsComponent,
        UsersActivityComponent,
    ],
    imports: [
        CommonModule,
        MSWAdminRoutingModule,
        SharedModule,
    ],
    providers: [
        LoginApiService,
        UsersApiService,
        UsersTableMapService,
        DashboardApiService,
    ]
})
export class MswAdminModule { }
