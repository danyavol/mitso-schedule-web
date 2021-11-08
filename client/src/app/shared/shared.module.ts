import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSelectModule, MAT_SELECT_CONFIG } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationComponent } from './components/notification/notification.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { LoadingDirective } from './directives/loading.directive';


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
    ],
    imports: [
        CommonModule,
        ...NG_MATERIALS,
        ...NG_MODULES,
    ],
    exports: [
        CommonModule,
        ...NG_MATERIALS,
        ...NG_MODULES,
        ValidationErrorComponent,
        LoadingDirective,
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
        }
    ]
})
export class SharedModule { }
