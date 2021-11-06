import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '@core/services/authentication.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthenticationService
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