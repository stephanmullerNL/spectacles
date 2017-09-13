import * as Steem from 'steem';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {VoteCounter} from '../models/voteCounter';

@Injectable()
export class UserService {

    private users: Map<string, User> = new Map();
    private currentUser = new BehaviorSubject<User>(new User());

    currentUser$ = this.currentUser.asObservable();

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

    getUsers(usernames: string[]): Promise<User[]> {
        const newUsers = usernames.filter(name => !this.users.get(name));

        return Steem.api.getAccounts(newUsers).then((users: User[]) => {
            users.forEach(user => this.users.set(user.name, this.transform(user)));

            // return all requested users, not just the new ones
            return usernames.map((username: string) => this.users.get(username));
        });
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
