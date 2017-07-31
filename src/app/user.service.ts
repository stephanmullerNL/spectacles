import * as Steem from 'steem';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

    constructor() {
    }

    getUserInfo(username: string) {
        return Steem.api.getAccounts([username]).then(user => {
            if (!user.length) {
                throw new Error(`User ${username} not found`);
            } else {
                return this.transform(user[0]);
            }
        });
    }

    private transform(user) {
        user.profile = JSON.parse(user.json_metadata).profile;

        return user;
    }

}
