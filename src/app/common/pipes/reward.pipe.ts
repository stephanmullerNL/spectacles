import {Pipe, PipeTransform} from '@angular/core';
import {SteemService} from '../../steem.service';

@Pipe({
    name: 'reward'
})
export class RewardPipe implements PipeTransform {
    private recentClaims = 0;
    private rewardBalance;
    private steemValue;

    constructor(private steemService: SteemService) {
        steemService.rewardFund$.subscribe(rewardFund => {
            this.recentClaims = this.toNumber(rewardFund.recent_claims);
            this.rewardBalance = this.toNumber(rewardFund.reward_balance);
        });
        steemService.feedHistory$.subscribe(feedHistory => {
            this.steemValue = this.toNumber(feedHistory.current_median_history.base);
        });
    }

    transform(shares: number): string {
        const reward = shares * this.steemValue * (this.rewardBalance / this.recentClaims);

        console.log('shares', shares, 'reward', reward);
        return reward.toFixed(2);
    }

    private toNumber(string) {
        return Number(string.split(' ')[0]);
    }
}