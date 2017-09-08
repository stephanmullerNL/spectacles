import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {Follower, FollowCount} from '../models/followers';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from "app/models/user";

@Injectable()
export class FollowersService {

    private followCount = new BehaviorSubject<FollowCount>(new FollowCount());

    followCount$ = this.followCount.asObservable();

    followers: Map<string, Follower[]> = new Map();
    followerUsers: Map<string, User[]> = new Map();

    constructor() {
    }

    getAllFollowers(username: string): Promise<Follower[]> {
        async function fetch(all = [], start = '') {
            const newData = await Steem.api.getFollowers(username, start, 'blog', 1000);
            const lastUser = newData[newData.length - 1];

            all = all.concat(newData);

            return (newData.length === 1000) ? await fetch(all, lastUser.follower) : all;
        }

        const followers = fetch();

        this.followers.set(username, followers);

        return followers;
    }

    fetchFollowCount(username: string): Promise<FollowCount> {
        return Steem.api.getFollowCount(username).then(followCount => {
            return this.followCount.next(followCount);
        });
    }

    setFollowerUsers(username, users) {
        this.followerUsers.set(username, users);
    }
}
