import * as Steem from 'steem';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

    user;

    constructor() {
    }

    fetchUser(username: string) {
        return Steem.api.getAccounts([username]).then(user => {
            if (!user.length) {
                throw new Error(`User ${username} not found`);
            } else {
                this.user = this.transform(user[0]);
                return this.user;
            }
        });
    }

    getUser() {
        return this.user;
    }

    private transform(user) {
        user.profile = JSON.parse(user.json_metadata).profile;

        return user;
    }

}
