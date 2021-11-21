import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MSWAdminAuthService } from '@core/services/msw-admin-auth.service';

@Component({
    selector: 'msw-sidebar',
    templateUrl: './msw-sidebar.component.html',
    styleUrls: ['./msw-sidebar.component.scss']
})
export class MSWSidebarComponent {

    @Input() sidenav: MatSidenav;

    constructor(
        private authService: MSWAdminAuthService
    ) { }

    public get isMobileView(): boolean {
        return this.sidenav.mode === 'over';
    }

    public get isSidenavOpened(): boolean {
        return this.sidenav.opened;
    }
    
    public onElementClick(): void {
        if (this.isMobileView) {
            this.sidenav.close();
        }
    }

    public logout(): void {
        this.authService.logOut();
    }

}
