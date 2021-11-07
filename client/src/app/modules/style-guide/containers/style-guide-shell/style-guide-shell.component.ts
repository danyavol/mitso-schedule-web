import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
    selector: 'app-style-guide-shell',
    templateUrl: './style-guide-shell.component.html',
    styleUrls: ['./style-guide-shell.component.scss']
})
export class StyleGuideShellComponent implements OnInit {

    constructor(private overlayContainer: OverlayContainer) { }

    ngOnInit(): void {
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
    }

}
