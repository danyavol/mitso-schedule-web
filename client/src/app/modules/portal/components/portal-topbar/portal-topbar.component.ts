import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'portal-topbar',
    templateUrl: './portal-topbar.component.html',
    styleUrls: ['./portal-topbar.component.scss']
})
export class PortalTopbarComponent {

    @Input() sidenav: MatSidenav;

    public isMobileView$ = this.observer.observe(['(max-width: 960px)']).pipe(
        map(res => res.matches),
        tap(() => {
            this.sidenav.close();
        })
    );

    constructor(
        public router: Router,
        private observer: BreakpointObserver
    ) { }
    
    public get url(): string {
        return this.router.url;
    }

    public get isSidenavOpened(): boolean {
        return this.sidenav.opened;
    }

    public isRouteActive(route: string): boolean {
        return this.url === route;
    }

}
