import {Injectable} from '@angular/core';
import * as Steem from 'steem';
import {VoteCounter} from '../models/voteCounter';
import {Post} from 'app/models/post';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PostsService {

    private allPosts = new BehaviorSubject<Post[]>([]);
    private allReplies = new BehaviorSubject<Post[]>([]);

    allPosts$ = this.allPosts.asObservable();
    allReplies$ = this.allReplies.asObservable();

    constructor() {
    }

    private toFlatArray = (all, current) => all.concat(current);

    countPostsByAuthour(posts) {
        return posts.reduce((counter, post) => {
            const count = counter.get(post.author) || 0;
            return counter.set(post.author, count + 1);
        }, new Map());
    }

    countUpvotesByUser(upvotes) {
        return upvotes.reduce((all, upvote) => {
            const voteCounter = all.get(upvote.voter) || new VoteCounter();

            voteCounter.count++;
            voteCounter.rshares += Number(upvote.rshares);

            all.set(upvote.voter, voteCounter);

            return all;
        }, new Map());
    }

    fetchAllPostsAndComments(username: string): Promise<void> {
        const query = {
            limit: 100,
            start_author: username
        };

        // Date string gets ignored, but set it to a far future just to be sure
        return Promise.all([
            Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100),
            Steem.api.getDiscussionsByComments(query)
        ]).then(([posts, comments]) => {
            return this.allPosts.next(comments.concat(posts));
        });
    }

    fetchReplies(posts: Post[]) {
        const promises = posts.map(post => {
            return this.getReplies(post);
        });

        return Promise.all(promises).then(results => {
            const replies = results.reduce(this.toFlatArray, []);
            this.allReplies.next(replies);
        });
    }

    getAllPostUpvotes(posts) {
        return posts.reduce((all, post) => {
            return all.concat(post.active_votes);
        }, []);
    }

    getReplies(post) {
        return Steem.api.getContentReplies(post.author, post.permlink);
    }
}
