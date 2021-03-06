import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {SteemService} from './steem.service';


@Injectable()
export class SteemResolver implements Resolve<any> {
    constructor(private steemService: SteemService) {
    }

    resolve(): Promise<any> {
        return Promise.all([
            this.steemService.getDynamicGlobalProperties(),
            this.steemService.getFeedHistory(),
            this.steemService.getRewardFund()
        ]);
    }
}
