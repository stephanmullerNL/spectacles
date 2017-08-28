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

    getLastActivity(user: User) {
        const toSortableDate = string => Number(string.substr(0, 10).replace('-', ''));

        const lastPost = toSortableDate(user.last_post);
        const lastVote = toSortableDate(user.last_vote_time);

        return lastPost > lastVote ? user.last_post : user.last_vote_time;
    }

    getTotalShares(user: User) {
        const toNumber = str => Number(str.split(' ')[0]);

        return toNumber(user.vesting_shares) + toNumber(user.delegated_vesting_shares)
            - toNumber(user.received_vesting_shares);
    }

    getUsers(users) {
        return Steem.api.getAccounts(users);
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
