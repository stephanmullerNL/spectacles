import * as Steem from 'steem';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class UserService {

    private currentUser = new BehaviorSubject<User>(new User());
    private users = new BehaviorSubject<User[]>([]);

    currentUser$ = this.currentUser.asObservable();
    users$ = this.users.asObservable();

    constructor() {
    }

    fetchCurrentUser(username: string): Promise<User> {
        const name = username.toLowerCase();

        return Steem.api.getAccounts([name])
            .then(([user]) => {
                if (!user) {
                    throw new Error(`User ${username} not found`);
                } else {
                    return this.currentUser.next(this.transform(user));
                }
            });
    }

    fetchUsers(userNames: string[]) {
        return Steem.api.getAccounts(userNames).then((users: User[]) => {
            return users.map((user: User) => this.transform(user));
        }).then(users => {
            return this.users.next(users);
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

    lookupAccountNames(usernames: string[]): Promise<User[]> {
        const names = usernames.map(name => name.toLowerCase());
        return Steem.api.lookupAccountNames(names);
    }

    private transform(user: User): User {
        const metadata = user.json_metadata ? JSON.parse(user.json_metadata) : {};

        user.profile = metadata.profile || {};

        return user;
    }

}
