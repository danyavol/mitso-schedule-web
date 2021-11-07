import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StyleGuideShellComponent } from './containers/style-guide-shell/style-guide-shell.component';
import { StyleGuideRoutingModule } from './style-guide-routing.module';



@NgModule({
    declarations: [
        StyleGuideShellComponent
    ],
    imports: [
        CommonModule,
        StyleGuideRoutingModule,
        SharedModule,
    ],
    exports: [
        StyleGuideShellComponent
    ]
})
export class StyleGuideModule { }
