import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mswDate'
})
export class MswDatePipe extends DatePipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        return super.transform(value, 'dd.MM.y, HH:mm', ...args);
    }

}
