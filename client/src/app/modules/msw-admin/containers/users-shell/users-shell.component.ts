import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MappedUser, UsersTableMapService } from '@modules/msw-admin/components/users-table/users-table-map.service';
import { UsersApiService } from '@modules/msw-admin/services/users-api.service';
import { ReplaySubject, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
@Component({
    selector: 'users-shell',
    templateUrl: './users-shell.component.html',
    styleUrls: ['./users-shell.component.scss']
})
export class UsersShellComponent implements OnInit, OnDestroy {

    public totalItems: number;
    public isLoading = false;
    public searchString: string;
    public searchControl = new FormControl();
    private onDestroy = new Subject();
    private mappedUsersSbj = new ReplaySubject<MappedUser[]>()
    public mappedUsers$ = this.mappedUsersSbj.asObservable();

    constructor(
        private apiService: UsersApiService,
        private mapService: UsersTableMapService
    ) { }

    ngOnInit(): void {
        this.updateDataset();
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    public onSearch() {
        this.searchString = this.searchControl.value;
    }

    private updateDataset(): void {
        this.isLoading = true;
        this.apiService.getUsers()
            .pipe(
                takeUntil(this.onDestroy),
                finalize(() => this.isLoading = false)
            )
            .subscribe(data => {
                this.resetSearch();
                const users = this.mapService.getMappedData(data.items);
                this.mappedUsersSbj.next(users);
            });
    }

    public onRefreshClick(): void {
        this.updateDataset();
    }

    private resetSearch(): void {
        this.searchControl.reset('');
        this.searchString = '';
    }

}
