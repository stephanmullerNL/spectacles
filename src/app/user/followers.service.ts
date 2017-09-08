import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {Follower, FollowCount} from '../models/followers';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FollowersService {

    private followCount = new BehaviorSubject<FollowCount>(new FollowCount());

    followCount$ = this.followCount.asObservable();

    constructor() {
    }

    getAllFollowers(username: string): Promise<Follower[]> {
        async function fetch(all = [], start = '') {
            const newData = await Steem.api.getFollowers(username, start, 'blog', 1000);
            const lastUser = newData[newData.length - 1];

            all = all.concat(newData);

            return (newData.length === 1000) ? await fetch(all, lastUser.follower) : all;
        }

        return fetch();
    }

    fetchFollowCount(username: string): Promise<FollowCount> {
        return Steem.api.getFollowCount(username).then(followCount => {
            return this.followCount.next(followCount);
        });
    }
}
