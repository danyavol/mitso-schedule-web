import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { PortalRoutingModule } from './portal-routing.module';
import { ScheduleShellComponent } from './containers/schedule-shell/schedule-shell.component';



@NgModule({
    declarations: [
        PortalComponent,
        ScheduleShellComponent
    ],
    imports: [
        CommonModule,
        PortalRoutingModule
    ]
})
export class PortalModule { }
