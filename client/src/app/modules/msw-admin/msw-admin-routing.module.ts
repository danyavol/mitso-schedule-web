import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardShellComponent } from './containers/dashboard-shell/dashboard-shell.component';
import { LoginShellComponent } from './containers/login-shell/login-shell.component';
import { MSWAdminShellComponent } from './containers/msw-admin-shell/msw-admin-shell.component';
import { UsersShellComponent } from './containers/users-shell/users-shell.component';
import { MSWAdminGuard } from './guards/msw-admin.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginShellComponent
    },
    {
        path: '',
        component: MSWAdminShellComponent,
        canActivateChild: [MSWAdminGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardShellComponent
            },
            {
                path: 'users',
                component: UsersShellComponent
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [MSWAdminGuard],
    exports: [RouterModule]
})
export class MSWAdminRoutingModule { }
