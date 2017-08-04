import * as Steem from 'steem';
import { Injectable } from '@angular/core';
import {UserFollowCount} from '../models/userFollowCount';

@Injectable()
export class FollowersService {

  constructor() { }

  getFollowCount(username: string): Promise<UserFollowCount> {
    return Steem.api.getFollowCount(username).then((result: UserFollowCount) => {
      return result;
    });
  }

}
