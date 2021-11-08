import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginApiService } from '@modules/msw-admin/services/login-api.service';
import { MSWAdminAuthService } from '@modules/msw-admin/services/msw-admin-auth.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-login-shell',
    templateUrl: './login-shell.component.html',
    styleUrls: ['./login-shell.component.scss']
})
export class LoginShellComponent implements OnInit {

    public passwordControl = new FormControl('', Validators.required);
    public isLoading = false;
    public serverError: string;
    public showServerError: boolean = false;

    constructor(
        private authService: MSWAdminAuthService,
        private apiService: LoginApiService
    ) { }

    ngOnInit(): void {
    }

    public submit(): void {
        this.passwordControl.markAllAsTouched();
        if (this.passwordControl.invalid) return;

        this.showServerError = false;
        this.isLoading = true;
        this.apiService.logIn(this.passwordControl.value)
            .pipe(
                finalize(() => this.isLoading = false)
            )
            .subscribe(() => {
                this.authService.logIn();
            },
            err => {
                if (err.status === 401) {
                    this.showServerError = true;
                    this.serverError = 'Неверный пароль. Попробуйте еще раз';
                }
            });
    }

}
