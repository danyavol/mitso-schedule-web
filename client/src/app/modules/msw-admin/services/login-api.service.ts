import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";

@Injectable()
export class LoginApiService {

    constructor(private http: HttpService) {}

    public logIn(password: string): Observable<void> {
        const path = '/api/auth';
        return this.http.post(path, { password });
    }
}