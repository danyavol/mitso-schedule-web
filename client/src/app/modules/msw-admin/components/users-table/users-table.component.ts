import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersApiService } from '@modules/msw-admin/services/users-api.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { MappedUser, UsersTableMapService } from './users-table-map.service';

@Component({
    selector: 'users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements AfterViewInit, OnDestroy {

    public displayedColumns: string[] = ['username', 'name', 'group', 'createdAt', 'lastUseAt'];
    public totalItems: number;
    public dataSource: MatTableDataSource<MappedUser>;
    public isLoading = true;
    private onDestroy = new Subject();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private apiService: UsersApiService,
        private mapService: UsersTableMapService
    ) { }

    ngAfterViewInit() {
        this.updateDataset();
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    private updateDataset(): void {
        this.isLoading = true;
        this.apiService.getUsers()
            .pipe(
                takeUntil(this.onDestroy),
                finalize(() => this.isLoading = false)
            )
            .subscribe(data => {
                this.totalItems = data.total;
                const users = this.mapService.getMappedData(data.items);
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            });
    }

}
