import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceShellComponent } from './containers/balance-shell/balance-shell.component';
import { ScheduleShellComponent } from './containers/schedule-shell/schedule-shell.component';
import { TeachersShellComponent } from './containers/teachers-shell/teachers-shell.component';
import { PortalComponent } from './portal.component';

const routes: Routes = [
    {
        path: '',
        component: PortalComponent,
        children: [
            {
                path: 'schedule',
                component: ScheduleShellComponent
            },
            {
                path: 'teachers',
                component: TeachersShellComponent
            },
            {
                path: 'balance',
                component: BalanceShellComponent
            },
            { path: '', redirectTo: 'schedule', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
