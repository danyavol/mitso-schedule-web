import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BalanceResponse } from '@modules/portal/interfaces/portal.interface';
import { PortalApiService } from '@modules/portal/services/portal-api.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'msw-balance-shell',
    templateUrl: './balance-shell.component.html',
    styleUrls: ['./balance-shell.component.scss']
})
export class BalanceShellComponent implements OnInit, OnDestroy {

    public isLoading = false;
    public balanceNumber = new FormControl(null);
    public balanceData$: Observable<BalanceResponse>;
    
    private loadBalance$ = new Subject<string>();
    private destroy$ = new Subject();

    constructor(
        private apiService: PortalApiService
    ) { }

    ngOnInit(): void {
        this.balanceData$ = this.loadBalance$.pipe(
            tap(() => this.isLoading = true),
            switchMap((number) => this.apiService.getBalance(number).pipe(
                catchError(({ error }) => {
                    return of(error);
                })
            )),
            tap(() => this.isLoading = false),
            takeUntil(this.destroy$)
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onSearch(): void {
        if (this.balanceNumber.value) {
            this.loadBalance$.next(this.balanceNumber.value);
        }
    }

}
