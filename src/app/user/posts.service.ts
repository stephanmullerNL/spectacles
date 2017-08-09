import {Injectable} from '@angular/core';
import * as Steem from 'steem';

@Injectable()
export class PostsService {

    constructor() {
    }

    getPostCommenters(posts) {
        return posts.reduce((all, post) => {
            post.active_votes.forEach(voter => {
                all[voter.voter] = (all[voter.voter] || 0) + 1;
            });
            return all;
        }, {});
    }

    getPostUpvoters(posts) {
        return posts.reduce((all, post) => {
            post.active_votes.forEach(voter => {
                all[voter.voter] = (all[voter.voter] || 0) + 1;
            });
            return all;
        }, {});
    }

    getPostsByUser(username: string) {
        // Date string gets ignored, but set it to a far future just to be sure
        return Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100);
    }
}
