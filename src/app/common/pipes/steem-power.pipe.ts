import {Pipe, PipeTransform} from '@angular/core';
import {SteemService} from '../../steem.service';

@Pipe({
    name: 'steemPower'
})
export class SteemPowerPipe implements PipeTransform {
    private totalSteem;
    private totalShares;

    constructor(private steemService: SteemService) {
        steemService.globals$.subscribe(globals => {
            this.totalSteem = this.toNumber(globals.total_vesting_fund_steem);
            this.totalShares = this.toNumber(globals.total_vesting_shares);
        });
    }

    transform(shares: string): string {
        const steemPower = this.totalSteem * (this.toNumber(shares) / this.totalShares);

        return steemPower.toLocaleString() + ' SP';
    }

    private toNumber(input: any) {
        return (typeof input === 'number')
            ? input
            : Number(input.split(' ')[0]);
    }
}