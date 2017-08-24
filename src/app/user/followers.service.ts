import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {Follower, FollowCount} from '../models/followers';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FollowersService {

    private _followers = new BehaviorSubject<Follower[]>([]);
    private _followCount = new BehaviorSubject<FollowCount>(new FollowCount());

    followers$ = this._followers.asObservable();
    followCount$ = this._followCount.asObservable();

    constructor() {
    }

    fetchAllFollowers(username: string): void {
        async function fetch(all = [], start = '') {
            const newData = await Steem.api.getFollowers(username, start, 'blog', 1000);
            const lastUser = newData[newData.length - 1];

            all = all.concat(newData);

            return (newData.length === 1000) ? await fetch(all, lastUser.follower) : all;
        }

        return fetch().then(followers => {
            this._followers.next(followers);
        });
    }

    fetchFollowCount(username: string): Promise<FollowCount> {
        return Steem.api.getFollowCount(username).then(followCount => {
            this._followCount.next(followCount);
        });
    }
}
