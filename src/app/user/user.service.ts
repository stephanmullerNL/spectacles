import * as Steem from 'steem';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class UserService {

    private _user = new BehaviorSubject<User>(new User());

    user$ = this._user.asObservable();

    constructor() {
    }

    getUser(username: string): Promise<User> {
        const name = username.toLowerCase();

        return Steem.api.getAccounts([name])
            .then((users: User[]) => {
                if (!users.length) {
                    throw new Error(`User ${username} not found`);
                } else {
                    const user = this.transform(users[0]);
                    this._user.next(user);
                    return this.transform(users[0]);
                }
            });
    }

    private transform(user: User): User {
        user.profile = JSON.parse(user.json_metadata).profile;

        return user;
    }

}
