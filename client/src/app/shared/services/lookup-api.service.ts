import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Week } from "@modules/portal/interfaces/portal.interface";
import { GroupedGroupsFromApi, GroupFromApi } from "@shared/interfaces/lookup.interface";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LookupApiService {

    constructor(private http: HttpService) {}

    public groups$: Observable<GroupFromApi[]> = this.http.get('/api/groups', { grouped: false }).pipe(
        shareReplay(1)
    );

    public groupedGroups$: Observable<GroupedGroupsFromApi> = this.http.get('/api/groups', { grouped: true }).pipe(
        shareReplay(1)
    );

    public allWeeks$: Observable<Week[]> = this.http.get('/api/schedule/weeks').pipe(
        shareReplay(1)
    );

    public allTeachers$: Observable<string[]> = this.http.get('/api/teachers').pipe(
        shareReplay(1)
    );
    
}