import {Pipe, PipeTransform} from '@angular/core';
import {SteemService} from '../../steem.service';
import {SteemGlobals} from '../../models/steem';

@Pipe({
    name: 'votePower'
})
export class VotePowerPipe implements PipeTransform {
    private VOTE_REGENERATION_DAYS = 5;
    private STEEM_100_PERCENT = 10000;

    private votePowerReserveRate;

    constructor(private steemService: SteemService) {
        steemService.globals$.subscribe((globals: SteemGlobals) => {
            this.votePowerReserveRate = globals.vote_power_reserve_rate;
        });
    }

    transform(shares: number,
              power: number = this.STEEM_100_PERCENT,
              weight: number = this.STEEM_100_PERCENT): any {

        const usedPower = this.calculateUsedPower(power, weight);

        return shares * usedPower / this.STEEM_100_PERCENT;
    }

    private calculateUsedPower(power, weight) {
        const maxVoteDenomination = this.votePowerReserveRate * this.VOTE_REGENERATION_DAYS;
        const usedPower = power * weight / this.STEEM_100_PERCENT;

        return (usedPower + maxVoteDenomination - 1) / maxVoteDenomination;
    }
}
