import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { GroupedGroupsFromApi } from "@shared/interfaces/lookup.interface";
import { LookupApiService } from "@shared/services/lookup-api.service";
import { Observable } from "rxjs";
import { Lesson, Week } from "../interfaces/portal.interface";

@Injectable()
export class PortalApiService {

    constructor(
        private http: HttpService,
        private lookupApi: LookupApiService
    ) {}
    
    public getGroups(): Observable<GroupedGroupsFromApi> {
        return this.lookupApi.groupedGroups$;
    }

    public getAvailableWeeks(group?: string): Observable<Week[]> {
        const path = '/api/schedule/weeks';
        return this.http.get(path, { group });
    }

    public getSchedule(collection: string, group: string): Observable<Lesson[]> {
        const path = `/api/schedule/${collection}/${group}`;
        return this.http.get(path);
    }

    public getTeachers(): Observable<string[]> {
        const path = `/api/teachers`;
        return this.http.get(path);
    }

}