import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'msw-sidebar',
    templateUrl: './msw-sidebar.component.html',
    styleUrls: ['./msw-sidebar.component.scss']
})
export class MSWSidebarComponent implements OnInit {

    @Input() sidenav: MatSidenav;

    constructor() { }

    ngOnInit(): void {
    }

    get isMobileView(): boolean {
        return this.sidenav.mode === 'over';
    }

    get isSidenavOpened(): boolean {
        return this.sidenav.opened;
    }

}
