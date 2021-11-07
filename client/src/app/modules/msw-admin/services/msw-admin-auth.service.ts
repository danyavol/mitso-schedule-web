import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@core/services/local-storage.service';

@Injectable()
export class MSWAdminAuthService {

    private lsAuthKey = 'msw-admin-logged-in';
    private _isUserLoggedIn: boolean;

    constructor(
        private router: Router
    ) {
        const isLogged = LocalStorageService.get(this.lsAuthKey);
        this.isUserLoggedIn = isLogged == null ? false : isLogged;
    }

    public get isUserLoggedIn(): boolean {
        return this._isUserLoggedIn;
    }

    public logOut(): void {
        this.isUserLoggedIn = false;
        this.router.navigateByUrl('msw-admin/login');
    }

    public logIn(): void {
        this.isUserLoggedIn = true;
        this.router.navigateByUrl('msw-admin/dashboard');
    }

    private set isUserLoggedIn(value: boolean) {
        this._isUserLoggedIn = value;
        LocalStorageService.set(this.lsAuthKey, value);
    }

}