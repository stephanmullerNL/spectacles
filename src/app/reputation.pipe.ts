import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'reputation'
})
export class ReputationPipe implements PipeTransform {

    transform(value: number, unrounded: boolean) {
        const isNegative = (value < 0);
        let reputation_level = Math.log10(Math.abs(value));

        reputation_level = Math.max(reputation_level - 9, 0);

        if (isNegative) {
            reputation_level *= -1;
        }

        reputation_level = (reputation_level * 9) + 25;

        return unrounded ? reputation_level : Math.floor(reputation_level);
    }
}
