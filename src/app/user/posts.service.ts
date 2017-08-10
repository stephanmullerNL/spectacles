import {Injectable} from '@angular/core';
import * as Steem from 'steem';

@Injectable()
export class PostsService {

    constructor() {
    }

    // Steem.api.getAccountVotes('pilcrow')
    //     .then(res => console.log(res));

    getPostCommentersAsync(posts) {
        const promises = posts.map(post => {
            return this.getPostCommentsAsync(post);
        });

        return Promise.all(promises).then((results: any[][]) => {
            return results.reduce((all, comments) => {
                comments.forEach(comment => {
                    all[comment.author] = (all[comment.author] || 0) + 1;
                });
                return all;
            }, {});
        });
    }

    getPostCommentsAsync(post) {
        return Steem.api.getContentReplies(post.author, post.permlink);
    }

    getPostUpvoters(posts) {
        return posts.reduce((all, post) => {
            post.active_votes.forEach(voter => {
                all[voter.voter] = (all[voter.voter] || 0) + 1;
            });
            return all;
        }, {});
    }

    getPostsByUserAsync(username: string) {
        // Date string gets ignored, but set it to a far future just to be sure
        return Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100);
    }
}
