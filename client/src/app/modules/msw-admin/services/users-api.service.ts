import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { PaginatedData } from "@shared/interfaces/api.interface";
import { GroupedGroupsFromApi } from "@shared/interfaces/lookup.interface";
import { LookupApiService } from "@shared/services/lookup-api.service";
import { Observable } from "rxjs";
import { UserFromApi } from "../interfaces/users.interface";

@Injectable()
export class UsersApiService {

    constructor(private http: HttpService, private lookupApi: LookupApiService) {}
    
    public getUsers(): Observable<PaginatedData<UserFromApi>> {
        const path = '/api/users';
        return this.http.get(path);
    }

    public getGroups(): Observable<GroupedGroupsFromApi> {
        return this.lookupApi.groupedGroups$;
    }
}