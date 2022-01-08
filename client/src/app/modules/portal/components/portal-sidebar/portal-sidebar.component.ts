import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'portal-sidebar',
    templateUrl: './portal-sidebar.component.html',
    styleUrls: ['./portal-sidebar.component.scss']
})
export class PortalSidebarComponent {

    @Input() sidenav: MatSidenav;

    constructor(
    ) { }

    public get isSidenavOpened(): boolean {
        return this.sidenav.opened;
    }
    
    public onElementClick(): void {
        this.sidenav.close();
    }

}
