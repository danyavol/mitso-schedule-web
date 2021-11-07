import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginShellComponent } from './containers/login-shell/login-shell.component';
import { SharedModule } from '@shared/shared.module';
import { MSWAdminRoutingModule } from './msw-admin-routing.module';
import { MSWAdminAuthService } from './services/msw-admin-auth.service';
import { MSWAdminShellComponent } from './containers/msw-admin-shell/msw-admin-shell.component';
import { DashboardShellComponent } from './containers/dashboard-shell/dashboard-shell.component';
import { MSWSidebarComponent } from './components/msw-sidebar/msw-sidebar.component';
import { MSWTopbarComponent } from './components/msw-topbar/msw-topbar.component';



@NgModule({
    declarations: [
        LoginShellComponent,
        MSWAdminShellComponent,
        DashboardShellComponent,
        MSWSidebarComponent,
        MSWTopbarComponent,
    ],
    imports: [
        CommonModule,
        MSWAdminRoutingModule,
        SharedModule,
    ],
    providers: [
        MSWAdminAuthService,
    ]
})
export class MswAdminModule { }
