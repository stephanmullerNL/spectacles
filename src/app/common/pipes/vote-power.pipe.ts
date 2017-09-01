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

        // no idea why, see:
        // https://steemit.com/steemdev/@jfollas/write-a-steemit-web-app-part-13-how-to-calculate-a-vote-s-rshares
        const multiplier = 1000000;
        const usedPower = this.calculateUsedPower(power, weight);
        const voteShares = shares * usedPower / this.STEEM_100_PERCENT;

        return voteShares * multiplier;
    }

    private calculateUsedPower(power, weight) {
        const maxVoteDenomination = this.votePowerReserveRate * this.VOTE_REGENERATION_DAYS;
        const usedPower = power * weight / this.STEEM_100_PERCENT;

        return (usedPower + maxVoteDenomination - 1) / maxVoteDenomination;
    }
}
