import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private lsAuthKey = 'isLoggedIn';
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
        this.router.navigateByUrl('auth/login');
    }

    public logIn(): void {
        this.isUserLoggedIn = true;
        this.router.navigateByUrl('dashboard');
    }

    private set isUserLoggedIn(value: boolean) {
        this._isUserLoggedIn = value;
        LocalStorageService.set(this.lsAuthKey, value);
    }

}