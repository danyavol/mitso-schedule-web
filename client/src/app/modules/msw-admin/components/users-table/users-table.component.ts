import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MswPaginator } from '@shared/components/msw-paginator/msw-paginator.component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MappedUser } from './users-table-map.service';

@Component({
    selector: 'users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() mappedUsers$: Observable<MappedUser[]>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MswPaginator) paginatorComp: MswPaginator;

    public displayedColumns: Extract<keyof MappedUser, string>[] = ['username', 'name', 'group', 'createdAt', 'lastUseAt'];
    public totalItems: number;
    public dataSource: MatTableDataSource<MappedUser>;
    public isLoading = true;
    private onDestroy = new Subject();
    
    ngOnInit(): void {
        this.dataSource = new MatTableDataSource();

        this.mappedUsers$
            .pipe( takeUntil(this.onDestroy) )
            .subscribe(users => {
                this.dataSource.data = users;
            });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginatorComp.paginator;  
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

}
