import { Component, OnInit } from '@angular/core';
import { IconLoaderService } from '@core/icons-loader/icons-loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private iconService: IconLoaderService) { }

    ngOnInit() {
        this.iconService.registerIcons();
    }
}
