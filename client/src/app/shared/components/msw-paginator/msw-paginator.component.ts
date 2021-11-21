import { Component, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";

@Component({
    selector: 'msw-paginator',
    templateUrl: './msw-paginator.component.html',
    styleUrls: ['./msw-paginator.component.scss']
})
export class MswPaginator extends MatPaginatorIntl {

    @ViewChild(MatPaginator) public paginator: MatPaginator;

    firstPageLabel = 'В начало';
    lastPageLabel = 'В конец';
    previousPageLabel = 'Предыдущая';
    nextPageLabel = 'Следующая';
    itemsPerPageLabel = 'Элементов на странице:';

    getRangeLabel = function (page: number, pageSize: number, length: number): string {
        return `Страница: ${page + 1} из ${Math.ceil(length/pageSize)}`;
    };
}