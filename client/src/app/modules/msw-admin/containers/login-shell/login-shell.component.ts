import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { LoginApiService } from '@modules/msw-admin/services/login-api.service';
import { MSWAdminAuthService } from '@modules/msw-admin/services/msw-admin-auth.service';
import { NotificationService } from '@shared/services/notification.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-login-shell',
    templateUrl: './login-shell.component.html',
    styleUrls: ['./login-shell.component.scss']
})
export class LoginShellComponent implements OnDestroy {

    public passwordControl = new FormControl('', Validators.required);
    public isLoading = false;
    public serverError: string;
    public showServerError: boolean = false;
    private errorNotification: MatSnackBarRef<any>;

    constructor(
        private authService: MSWAdminAuthService,
        private apiService: LoginApiService,
        private notification: NotificationService,
    ) { }

    ngOnDestroy(): void {
        this.errorNotification?.dismiss();
    }

    public submit(): void {
        this.passwordControl.markAllAsTouched();
        if (this.passwordControl.invalid) return;

        this.errorNotification?.dismiss();
        this.isLoading = true;
        this.apiService.logIn(this.passwordControl.value)
            .pipe(
                finalize(() => this.isLoading = false)
            )
            .subscribe(() => {
                this.authService.logIn();
                this.notification.success('Вход выполнен успешно!');
            },
            err => {
                if (err.status === 401) {
                    this.errorNotification = this.notification.error('Неверный пароль!');
                }
            });
    }

}
