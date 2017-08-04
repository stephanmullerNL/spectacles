import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'reputation'
})
export class ReputationPipe implements PipeTransform {

    transform(value: number) {
        const isNegative = (value < 0);
        let reputation = Math.log10(Math.abs(value));

        reputation = Math.max(reputation - 9, 0);
        reputation *= isNegative ? -9 : 9;
        reputation += 25;

        return Math.floor(reputation);
    }
}
