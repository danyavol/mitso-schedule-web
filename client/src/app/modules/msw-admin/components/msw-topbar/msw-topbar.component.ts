import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MSWAdminAuthService } from '@core/services/msw-admin-auth.service';

@Component({
    selector: 'msw-topbar',
    templateUrl: './msw-topbar.component.html',
    styleUrls: ['./msw-topbar.component.scss']
})
export class MSWTopbarComponent {

    @Input() sidenav: MatSidenav;

    constructor(
        private authService: MSWAdminAuthService,
        public router: Router,
    ) { }
    
    public get url(): string {
        return this.router.url;
    }

    public get isMobileView(): boolean {
        return this.sidenav.mode === 'over';
    }

    public get isSidenavOpened(): boolean {
        return this.sidenav.opened;
    }

    public logout(): void {
        this.authService.logOut();
    }

}
