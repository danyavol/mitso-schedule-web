import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mswCurrency'
})
export class MswCurrencyPipe implements PipeTransform {

    transform(value: number): any {
        if (typeof value !== 'number') return value;

        const thousandSeparator = ' ';
        const fractionSeparator = '.';
        
        let [integerPart, fractionPart] = value.toFixed(2).split('.');

        integerPart = integerPart.split('').reverse()
            .map((n, i) => (i+1) % 3 === 0 ? thousandSeparator + n : n)
            .reverse().join('').trim();

        return integerPart + fractionSeparator + fractionPart + ' р.';
    }

}
