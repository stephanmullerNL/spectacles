import * as Steem from 'steem';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {UserFollowCount} from '../models/userFollowCount';
import {User} from '../models/user';

@Injectable()
export class FollowersService {

    private _followCount = new BehaviorSubject<UserFollowCount>(new UserFollowCount());
;

    followCount$ = this._followCount.asObservable();

    constructor() {
    }

    getFollowCount(username: string): Promise<UserFollowCount> {
        return Steem.api.getFollowCount(username).then((result: UserFollowCount) => {
            this._followCount.next(result);
        });
    }

}
