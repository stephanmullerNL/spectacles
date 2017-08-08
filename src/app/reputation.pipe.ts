import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'reputation'
})
export class ReputationPipe implements PipeTransform {

    transform(value: number, decimals: number = 0) {
        const isNegative = (value < 0);
        let reputation = Math.log10(Math.abs(value));

        reputation = Math.max(reputation - 9, 0);
        reputation *= isNegative ? -9 : 9;
        reputation += 25;

        return this.round(reputation, decimals);
    }

    private round(value: number, decimals: number) {
        const multiplier = Math.pow(10, decimals);
        return Math.floor(value * multiplier) / multiplier;
    }
}
