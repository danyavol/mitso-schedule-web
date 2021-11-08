import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MSWAdminAuthService } from '../services/msw-admin-auth.service';

@Injectable()
export class MSWAdminHttpAuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: MSWAdminAuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true
        });
        return next.handle(req).pipe(
            tap(
                () => {}, 
                err => {
                    if (err instanceof HttpErrorResponse)
                        if (err.status === 401) 
                            this.authService.logOut();
                }
            )
        );
    }
}