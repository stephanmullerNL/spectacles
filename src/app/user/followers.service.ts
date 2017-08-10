import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {UserFollowCount} from '../models/userFollowCount';
import {User} from '../models/user';

@Injectable()
export class FollowersService {

    constructor() {
    }

    getFollowCountAsync(username: string): Promise<UserFollowCount> {
        return Steem.api.getFollowCountAsync(username);
    }

    getFollowersAsync(username: string) {
        return Steem.api.getFollowersAsync(username, 0, 'blog', 1000);
    }

    getFollowing(username: string) {
        return Steem.api.getFollowing(username, 0, 'blog', 100);
    }
}
