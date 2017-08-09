import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {UserFollowCount} from '../models/userFollowCount';
import {User} from '../models/user';

@Injectable()
export class FollowersService {

    constructor() {
    }

    getFollowCount(username: string): Promise<UserFollowCount> {
        return Steem.api.getFollowCount(username).then(res => {
            console.log('count', res);
            return res;
        });
    }

    getFollowers(username: string) {
        const toFollowerName = follower => follower.follower;

        return Steem.api.getFollowers(username, 0, 'blog', 100)
            .then(followers => followers.map(toFollowerName));
    }

    getFollowing(username: string) {
        const toUserName = follower => follower.following;

        return Steem.api.getFollowing(username, 0, 'blog', 100)
            .then(following => following.map(toUserName));
    }
}
