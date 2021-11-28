import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { PaginatedData } from "@shared/interfaces/api.interface";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { GroupedGroupsFromApi, GroupFromApi, UserFromApi } from "../interfaces/users.interface";

@Injectable()
export class UsersApiService {

    constructor(private http: HttpService) {}
    
    public getUsers(): Observable<PaginatedData<UserFromApi>> {
        const path = '/api/users';
        return this.http.get(path);
    }

    private cachedGroups: GroupedGroupsFromApi = null;
    public getGroups(): Observable<GroupedGroupsFromApi> {
        if (this.cachedGroups) return of(this.cachedGroups);

        const path = '/api/groups';
        return this.http.get(path, { grouped: true }).pipe(
            tap(groups => this.cachedGroups = groups)
        );
    }
}