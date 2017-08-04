import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {UserFollowCount} from '../models/userFollowCount';

@Injectable()
export class UserService {

    private user: User;

    constructor() {
    }

    getActiveUser(): User {
        return this.user;
    }

    getUser(username: string): Promise<User> {
        return Steem.api.getAccounts([username]).then((users: User[]) => {
            if (!users.length) {
                throw new Error(`User ${username} not found`);
            } else {
                return this.user = this.transform(users[0]);
            }
        });
    }

    private transform(user: User): User {
        user.profile = JSON.parse(user.json_metadata).profile;

        return user;
    }

}
