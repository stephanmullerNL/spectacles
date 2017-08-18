import * as Steem from 'steem';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SteemGlobals, SteemFeed, SteemRewardFund} from './models/steem';

@Injectable()
export class SteemService {
  private _feedHistory = new BehaviorSubject<SteemFeed>(new SteemFeed());
  private _globals = new BehaviorSubject<SteemGlobals>(new SteemGlobals());
  private _rewardFund = new BehaviorSubject<SteemRewardFund>(new SteemRewardFund());

  globals$ = this._globals.asObservable();
  feedHistory$ = this._feedHistory.asObservable();
  rewardFund$ = this._rewardFund.asObservable();

  constructor() { }

  getDynamicGlobalProperties() {
    return Steem.api.getDynamicGlobalProperties().then(globalProperties => {
      this._globals.next(globalProperties);
    });
  }

  getFeedHistory() {
    return Steem.api.getFeedHistory().then(feedHistory => {
      this._feedHistory.next(feedHistory);
    });
  }

  getRewardFund() {
    return Steem.api.getRewardFund('post').then(rewardFund => {
      this._rewardFund.next(rewardFund);
    });
  }
}
