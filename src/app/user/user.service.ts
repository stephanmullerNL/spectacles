import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {User} from './user';

@Injectable()
export class UserService {

    constructor() {
    }

    getUser(username: string) {
        return Steem.api.getAccounts([username]).then((users: User[]) => {
            if (!users.length) {
                throw new Error(`User ${username} not found`);
            } else {
                return this.transform(users[0]);
            }
        });
    }

    private transform(user: User): User {
        user.profile = JSON.parse(user.json_metadata).profile;

        return user;
    }

}
