import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MSWAdminAuthService } from '@modules/msw-admin/services/msw-admin-auth.service';

@Component({
    selector: 'msw-topbar',
    templateUrl: './msw-topbar.component.html',
    styleUrls: ['./msw-topbar.component.scss']
})
export class MSWTopbarComponent implements OnInit {

    @Input() sidenav: MatSidenav;

    constructor(
        private authService: MSWAdminAuthService
    ) { }

    ngOnInit(): void {
    }

    get isMobileView(): boolean {
        return this.sidenav.mode === 'over';
    }

    get isSidenavOpened(): boolean {
        return this.sidenav.opened;
    }

    public logout(): void {
        this.authService.logOut();
    }

}
