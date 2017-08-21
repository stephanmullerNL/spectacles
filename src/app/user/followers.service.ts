import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {Follower, FollowCount} from '../models/followers';

@Injectable()
export class FollowersService {

    private followers: Follower[];
    private followCount: FollowCount;

    constructor() {
    }

    fetchAllFollowers(username: string): void {
        Steem.api.getFollowers(username, 0, 'blog', 1000).then(followers => {
            this.followers = followers;
        });
    }

    fetchFollowCount(username: string): Promise<FollowCount> {
        return Steem.api.getFollowCount(username).then(followCount => {
            this.followCount = followCount;
        });
    }

    getFollowCount(): FollowCount {
        return this.followCount;
    }

    getFollowers(): Follower[] {
        return this.followers;
    }

    getFollowing(username: string) {
        return Steem.api.getFollowing(username, 0, 'blog', 100);
    }
}
