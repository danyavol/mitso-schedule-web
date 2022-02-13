import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserFromApi } from '@modules/msw-admin/interfaces/users.interface';
import { MswPaginator } from '@shared/components/msw-paginator/msw-paginator.component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { MappedUser } from './users-table-map.service';

@Component({
    selector: 'users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    @Input() mappedUsers$: Observable<MappedUser[]>;
    @Input() searchString: string;

    @Output() totalItems = new EventEmitter<number>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MswPaginator) paginatorComp: MswPaginator;

    public displayedColumns: string[] = ['username', 'name', 'group', 'createdAt', 'lastUseAt', 'action'];
    public dataSource: MatTableDataSource<MappedUser>;
    public isLoading = true;
    private onDestroy = new Subject();

    constructor(
        private dialog: MatDialog,
    ) {
        this.dataSource = new MatTableDataSource();
        this.dataSource.filterPredicate = (user, filter) =>
            user.group?.includes(filter) || user.name?.includes(filter)
            || user.username?.includes(filter);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.searchString && this.dataSource.data?.length) {
            this.dataSource.filter = this.searchString;
            this.totalItems.emit(this.dataSource.filteredData.length);
        }
    }
    
    ngOnInit(): void {
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

    public openEditUserModal(user: UserFromApi): void {
        this.dialog.open(EditUserModalComponent, {
            data: user,
            autoFocus: false
        });
    }

}
