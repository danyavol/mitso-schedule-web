import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environment';


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private apiUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {}

    public get(path: string, queryParams: any = null, options: any = this.getDefaultRequestOptions()): Observable<any> {
        const fullPath: string = this.getPathWithData(path, queryParams);

        return this.http.get(this.apiUrl + fullPath, options)
            .pipe(
                catchError(this.handleError.bind(this)),
            );
    }

    public post(path: string, data: any, options: any = this.getDefaultRequestOptions()): Observable<any> {
        return this.http.post(this.apiUrl + path, data, options)
            .pipe(
                catchError(this.handleError.bind(this)),
            );
    }

    public put(path: string, data: any, options: any = this.getDefaultRequestOptions()): Observable<any> {
        return this.http.put(this.apiUrl + path, data, options)
            .pipe(
                catchError(this.handleError.bind(this)),
            );
    }

    public patch(path: string, data: any, options: any = this.getDefaultRequestOptions()): Observable<any> {
        return this.http.patch(this.apiUrl + path, data, options)
            .pipe(
                catchError(this.handleError.bind(this)),
            );
    }

    public delete(path: string, data: any = null, options: any = this.getDefaultRequestOptions()): Observable<any> {
        const fullPath: string = this.getPathWithData(path, data);

        return this.http.delete(this.apiUrl + fullPath, options)
            .pipe(
                catchError(this.handleError.bind(this)),
            );
    }

    public convertBase64ToFile(content: string, fileName: string, type: string): File {
        const byteCharacters = atob(content);
        const byteNumbers = new ArrayBuffer(byteCharacters.length);
        const byteArray = new Uint8Array(byteNumbers);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }
        const file: any = new Blob([byteArray], { type });
        file.lastModifiedDate = new Date();
        file.name = fileName;

        return file;
    }

    private getDefaultRequestOptions(): any {
        const header: object = new HttpHeaders({ 'Content-Type': 'application/json' });

        return { headers: header };
    }

    private getPathWithData(path: string, data: any): string {
        const paramString: string[] = [];
        if (data) {
            for (const p in data) {
                if (data.hasOwnProperty(p)) {
                    paramString.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
                }
            }
        }

        return path + (paramString.length > 0 ? '?' : '') + paramString.join('&');
    }

    private handleError(err: HttpErrorResponse | ErrorEvent | any): any {
        let message: string;
        let status: number;
        if (err.error instanceof ErrorEvent) {
            message = `An error occurred: ${err.error.message}`;
            status = err.error.status;
        } else {
            message = `Backend returned code ${err.status}: ${err.message}`;
            status = err.status;
        }

        return throwError({ message, status });
    }
}
