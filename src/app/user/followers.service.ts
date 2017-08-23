import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {UserFollowCount} from '../models/userFollowCount';
import {User} from '../models/user';

@Injectable()
export class FollowersService {

    constructor() {
    }

    getFollowCount(username: string): Promise<UserFollowCount> {
        return Steem.api.getFollowCount(username);
    }

    getFollowers(username: string) {
        async function fetch(all = [], start = '') {
            const newData = await Steem.api.getFollowers(username, start, 'blog', 1000);
            const lastUser = newData[newData.length - 1];

            all = all.concat(newData);

            return (newData.length === 1000) ? await fetch(all, lastUser.follower) : all;
        }

        return fetch();
    }

    getFollowing(username: string) {
        return Steem.api.getFollowing(username, 0, 'blog', 100);
    }
}
