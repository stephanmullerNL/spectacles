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

    private toFlatArray = (all, current) => all.concat(current);

    fetchAllPosts(username: string): Promise<void> {
        // Date string gets ignored, but set it to a far future just to be sure
        return Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100)
            .then((posts: Post[]) => {
                return this.posts.next(posts);
            });
    }

    fetchAllComments(username: string): Promise<void> {
        const query = {
            limit: 100,
            start_author: username
        };

        return Steem.api.getDiscussionsByComments(query)
            .then((posts: Post[]) => {
                return this.comments.next(posts);
            });
    }

    getAllPostUpvotes(posts) {
        return posts.reduce((all, post) => {
            return all.concat(post.active_votes);
        }, []);
    }

    getCommentsForPosts(posts: Post[]) {
        const promises = posts.map(post => {
            return this.getPostComments(post);
        });

        return Promise.all(promises).then(results => {
            return results.reduce(this.toFlatArray, []);
        });
    }

    getPostComments(post) {
        return Steem.api.getContentReplies(post.author, post.permlink);
    }

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
}
