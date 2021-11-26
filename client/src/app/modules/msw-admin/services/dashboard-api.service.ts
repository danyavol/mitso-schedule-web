import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { RegistrationChartData } from "../interfaces/dashboard.interface";

@Injectable()
export class DashboardApiService {

    constructor(
        private http: HttpService
    ) {}

    public getDataForRegistrationsChart(): Observable<RegistrationChartData> {
        const path = '/api/stats/registrationChart';
        return this.http.get(path);
    }
}