import * as Steem from 'steem';
import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class UserService {

    private user: User;

    constructor() {
    }

    getActiveUser(): User {
        return this.user;
    }

    getUser(username: string): Promise<User> {
        const name = username.toLowerCase();

        return Steem.api.getAccounts([name])
            .then((users: User[]) => {
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
