import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { Observable } from "rxjs";
import { CoursesChartData, FeaturesUsageData, NewUsersData, RegistrationChartData, UsersActivityData } from "../interfaces/dashboard.interface";

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

    public getNewUsersData(): Observable<NewUsersData> {
        const path = '/api/stats/newUsers';
        return this.http.get(path);
    }

    public getUsersActivity(): Observable<UsersActivityData> {
        const path = '/api/stats/amount';
        return this.http.get(path);
    }
}