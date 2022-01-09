import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSelectModule, MAT_SELECT_CONFIG } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MswPaginator } from './components/msw-paginator/msw-paginator.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { AdaptiveViewDirective } from './directives/adaptive-view.directive';
import { LoadingDirective } from './directives/loading.directive';
import { MswDatePipe } from './pipes/msw-date.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


const NG_MATERIALS = [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDialogModule,
];

const NG_MODULES = [
    FlexLayoutModule,
    ReactiveFormsModule,
    LayoutModule,
];

@NgModule({
    declarations: [
        ValidationErrorComponent,
        LoadingDirective,
        NotificationComponent,
        MswDatePipe,
        MswPaginator,
        AdaptiveViewDirective,
    ],
    imports: [
        CommonModule,
        ...NG_MATERIALS,
        ...NG_MODULES,
        NgApexchartsModule,
        NgxMatSelectSearchModule,
    ],
    exports: [
        CommonModule,
        ...NG_MATERIALS,
        ...NG_MODULES,
        ValidationErrorComponent,
        LoadingDirective,
        MswDatePipe,
        MswPaginator,
        AdaptiveViewDirective,
        NgApexchartsModule,
        NgxMatSelectSearchModule,
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', floatLabel: 'auto' } },
        { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
        { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
        { provide: MAT_SELECT_CONFIG, useValue: { disableOptionCentering: true } },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                horizontalPosition: 'right',
                verticalPosition: 'top'
            } 
        },
        { provide: MatPaginatorIntl, useClass: MswPaginator }
    ]
})
export class SharedModule { }
