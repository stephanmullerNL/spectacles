import {Injectable} from '@angular/core';
import * as Steem from 'steem';

@Injectable()
export class PostsService {

    constructor() {
    }

    getPostsByUser(username: string) {
        // Date string gets ignored, but set it to a far future just to be sure
        return Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2017-01-01T00:00:00', 100);
    }
}
