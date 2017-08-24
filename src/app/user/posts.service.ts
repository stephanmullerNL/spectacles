import {Injectable} from '@angular/core';
import * as Steem from 'steem';
import {VoteCounter} from '../models/voteCounter';
import {Post} from 'app/models/post';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PostsService {

    private comments = new BehaviorSubject<Post[]>([]);
    private posts = new BehaviorSubject<Post[]>([]);

    comments$ = this.comments.asObservable();
    posts$ = this.posts.asObservable();

    constructor() {
    }

    fetchAllPosts(username: string): Promise<void> {
        // Date string gets ignored, but set it to a far future just to be sure
        return Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100)
            .then((posts: Post[]) => {
                this.posts.next(posts);
            });
    }

    fetchAllComments(username: string): Promise<void> {
        const query = {
            limit: 100,
            start_author: username
        };

        return Steem.api.getDiscussionsByComments(query)
            .then((posts: Post[]) => {
            console.log('comments', posts);
                this.comments.next(posts);
            });
    }

    getAllPostUpvotes(posts) {
        return posts.reduce((all, post) => {
            return all.concat(post.active_votes);
        }, []);
    }

    getPostCommenters(posts: Post[]) {
        const promises = posts.map(post => {
            return this.getPostComments(post);
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

    getPostComments(post) {
        return Steem.api.getContentReplies(post.author, post.permlink);
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
