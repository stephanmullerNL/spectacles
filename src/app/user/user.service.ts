import * as Steem from 'steem';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class UserService {

    private currentUser = new BehaviorSubject<User>(new User());

    currentUser$ = this.currentUser.asObservable();

    constructor() {
    }

    fetchCurrentUser(username: string): Promise<User> {
        const name = username.toLowerCase();

        return Steem.api.getAccounts([name])
            .then((users: User[]) => {
                if (!users.length) {
                    throw new Error(`User ${username} not found`);
                } else {
                    const user = this.transform(users[0]);
                    this.currentUser.next(user);
                }
            });
    }

    getLastActivity(user: User): number {
        const lastPost = Date.parse(user.last_post);
        const lastVote = Date.parse(user.last_vote_time);

        return Math.max(lastPost, lastVote);
    }

    getTotalShares(user: User) {
        const toNumber = str => Number(str.split(' ')[0]);

        return toNumber(user.vesting_shares) - toNumber(user.delegated_vesting_shares)
            + toNumber(user.received_vesting_shares);
    }

    getUsers(userNames: string[]) {
        return Steem.api.getAccounts(userNames).then((users: User[]) => {
            return users.map((user: User) => this.transform(user));
        });
    }

    lookupAccountNames(names: string[]): Promise<User[]> {
        return Steem.api.lookupAccountNames(names);
    }

    private transform(user: User): User {
        const metadata = user.json_metadata ? JSON.parse(user.json_metadata) : {};

        user.profile = metadata.profile || {};

        return user;
    }

}
