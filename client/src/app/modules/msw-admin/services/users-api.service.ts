import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { PaginatedData } from "@shared/interfaces/api.interface";
import { Observable } from "rxjs";
import { UserFromApi } from "../interfaces/users.interface";

@Injectable()
export class UsersApiService {

    constructor(private http: HttpService) {}
    
    public getUsers(): Observable<PaginatedData<UserFromApi>> {
        const path = '/api/users';
        return this.http.get(path);
    }
}