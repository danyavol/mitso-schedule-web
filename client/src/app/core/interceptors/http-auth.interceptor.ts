import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MSWAdminAuthService } from '@core/services/msw-admin-auth.service';
import { NotificationService } from '@shared/services/notification.service';

@Injectable()
export class MSWAdminHttpAuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: MSWAdminAuthService,
        private notification: NotificationService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            withCredentials: true
        });
        return next.handle(authReq).pipe(
            tap(
                () => {}, 
                err => {
                    if (err instanceof HttpErrorResponse)
                        if (err.status === 401) {
                            this.notification.error('Ошибка авторизации. Выполните вход еще раз');
                            this.authService.logOut();
                        }      
                }
            )
        );
    }
}