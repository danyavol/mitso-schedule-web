import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleGuideShellComponent } from './containers/style-guide-shell/style-guide-shell.component';

const routes: Routes = [
    {
        path: '',
        component: StyleGuideShellComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class StyleGuideRoutingModule { }
