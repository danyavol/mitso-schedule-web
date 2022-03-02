import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { GroupedGroupsFromApi } from "@shared/interfaces/lookup.interface";
import { LookupApiService } from "@shared/services/lookup-api.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { BalanceResponse, Lesson, Week } from "../interfaces/portal.interface";

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
        if (!group) return this.lookupApi.allWeeks$;

        const path = '/api/schedule/weeks';
        return this.http.get(path, { group });
    }

    public getSchedule(collection: string, group: string): Observable<Lesson[]> {
        const path = `/api/schedule/${collection}/${group}`;
        return this.http.get(path);
    }

    public getTeachers(): Observable<string[]> {
        return this.lookupApi.allTeachers$;
    }

    public getTeachersSchedule(collection: string, teacher: string): Observable<Lesson[]> {
        const path = `/api/teachers/${collection}/${teacher}`;
        return this.http.get(path);
    }

    public getBalance(balanceNumber: string): Observable<BalanceResponse> {
        const path = `/api/balance/${balanceNumber}`;
        return this.http.get(path);
    }

}