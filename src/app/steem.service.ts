import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SteemGlobals, SteemFeed, SteemRewardFund} from './models/steem';

@Injectable()
export class SteemService {
    private feedHistory = new BehaviorSubject<SteemFeed>(new SteemFeed());
    private globals = new BehaviorSubject<SteemGlobals>(new SteemGlobals());
    private rewardFund = new BehaviorSubject<SteemRewardFund>(new SteemRewardFund());

    globals$ = this.globals.asObservable();
    feedHistory$ = this.feedHistory.asObservable();
    rewardFund$ = this.rewardFund.asObservable();

    constructor() {
    }

    getDynamicGlobalProperties() {
        return Steem.api.getDynamicGlobalProperties().then(globalProperties => {
            return this.globals.next(globalProperties);
        });
    }

    getFeedHistory() {
        return Steem.api.getFeedHistory().then(feedHistory => {
            return this.feedHistory.next(feedHistory);
        });
    }

    getRewardFund() {
        return Steem.api.getRewardFund('post').then(rewardFund => {
            return this.rewardFund.next(rewardFund);
        });
    }
}
