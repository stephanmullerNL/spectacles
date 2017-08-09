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
        return Steem.api.getFollowers(username, 0, 'blog', 100);
    }

    getFollowing(username: string) {
        return Steem.api.getFollowing(username, 0, 'blog', 100);
    }
}
