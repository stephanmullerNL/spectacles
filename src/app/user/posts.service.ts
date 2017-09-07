import {Injectable} from '@angular/core';
import * as Steem from 'steem';
import {VoteCounter} from '../models/voteCounter';
import {Post} from 'app/models/post';

@Injectable()
export class PostsService {

    constructor() {
    }

    private toFlatArray = (all, current) => all.concat(current);

    getAllPostsAndComments(username: string): Promise<Post[]> {
        const query = {
            limit: 100,
            start_author: username
        };

        // Date string gets ignored, but set it to a far future just to be sure
        return Promise.all([
            Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100),
            Steem.api.getDiscussionsByComments(query)
        ]).then(([posts, comments]) => comments.concat(posts));
    }

    getReplies(posts: Post[]): Promise<Post[]> {
        const promises = posts.map(post => {
            return this.getPostReplies(post);
        });

        return Promise.all(promises).then(results => {
            return results.reduce(this.toFlatArray, []);
        });
    }

    getPostReplies(post) {
        return Steem.api.getContentReplies(post.author, post.permlink);
    }
}
