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
        async function fetch(all, start) {
            const newData = await Steem.api.getFollowers(username, start, 'blog', 1000);
            const lastUser = newData[newData.length - 1];

            all = all.concat(newData);

            return (newData.length === 1000) ? await fetch(all, lastUser.follower) : all;
        }

        return fetch([], '').then(followers => {
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
