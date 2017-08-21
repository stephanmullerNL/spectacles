import {Injectable} from '@angular/core';
import * as Steem from 'steem';
import {VoteCounter} from '../models/voteCounter';
import {Post} from 'app/models/post';

@Injectable()
export class PostsService {

    private posts;

    constructor() {
    }

    fetchAllPosts(username: string): Promise<Array<Post>> {
        // Date string gets ignored, but set it to a far future just to be sure
        return Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100)
            .then(posts => {
                this.posts = posts;
            });
    }

    getAllPostUpvotes(posts) {
        return posts.reduce((all, post) => {
            return all.concat(post.active_votes);
        }, []);
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

    getPosts(): Post[] {
        return this.posts;
    }

    groupUpvotesByMonth(upvotes) {
        return upvotes.reduce((all, upvote) => {
            const month = upvote.time.substr(0, 7);
            const voteCounter = all[month] || new VoteCounter();

            voteCounter.count++;
            voteCounter.rshares += Number(upvote.rshares);

            all[month] = voteCounter;

            return all;
        }, {});
    }

    groupUpvotesByUser(upvotes) {
        return upvotes.reduce((all, upvote) => {
            const voteCounter = all[upvote.voter] || new VoteCounter();

            voteCounter.count++;
            voteCounter.rshares += Number(upvote.rshares);

            all[upvote.voter] = voteCounter;

            return all;
        }, {});
    }
}
