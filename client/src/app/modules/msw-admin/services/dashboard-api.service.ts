import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { CoursesChartData, FeaturesUsageData, RegistrationChartData } from "../interfaces/dashboard.interface";

@Injectable()
export class DashboardApiService {

    constructor(
        private http: HttpService
    ) {}

    public getDataForRegistrationsChart(): Observable<RegistrationChartData> {
        const path = '/api/stats/registrationChart';
        return this.http.get(path);
    }

    public getDataForCoursesChart(): Observable<CoursesChartData> {
        const path = '/api/stats/amountByCourses';
        return this.http.get(path);
    }

    public getDataForFeaturesUsage(): Observable<FeaturesUsageData> {
        const path = '/api/stats/servicesUsage';
        return this.http.get(path);
    }
}