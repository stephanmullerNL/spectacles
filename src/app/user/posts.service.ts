import {Injectable} from '@angular/core';
import * as Steem from 'steem';
import {VoteCounter} from '../models/voteCounter';

@Injectable()
export class PostsService {

    constructor() {
    }

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

    getPostUpvoteCounts(posts) {
        return posts.reduce((all, post) => {
            post.active_votes.forEach(vote => {
                const voteCounter = all[vote.voter] || new VoteCounter();

                voteCounter.count++;
                voteCounter.rshares += Number(vote.rshares);

                all[vote.voter] = voteCounter;
            });
            return all;
        }, {});
    }

    getPostsByUserAsync(username: string) {
        // Date string gets ignored, but set it to a far future just to be sure
        return Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100);
    }
}
