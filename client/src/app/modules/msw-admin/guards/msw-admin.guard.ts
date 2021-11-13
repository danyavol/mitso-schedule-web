import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MSWAdminAuthService } from '@core/services/msw-admin-auth.service';

@Injectable()
export class MSWAdminGuard implements CanActivate, CanActivateChild {
    
    constructor(
        private authService: MSWAdminAuthService,
        private router: Router
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!this.authService.isUserLoggedIn) this.router.navigateByUrl('msw-admin/login');
        return this.authService.isUserLoggedIn;
    };

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }

}
