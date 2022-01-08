import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';
import { ScheduleShellComponent } from './containers/schedule-shell/schedule-shell.component';
import { SharedModule } from '@shared/shared.module';
import { PortalTopbarComponent } from './components/portal-topbar/portal-topbar.component';
import { PortalSidebarComponent } from './components/portal-sidebar/portal-sidebar.component';
import { PortalApiService } from './services/portal-api.service';
import { ScheduleComponent } from './components/schedule/schedule.component';



@NgModule({
    declarations: [
        PortalComponent,
        PortalTopbarComponent,
        PortalSidebarComponent,
        ScheduleShellComponent,
        ScheduleComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        PortalRoutingModule
    ],
    providers: [
        PortalApiService
    ]
})
export class PortalModule { }
