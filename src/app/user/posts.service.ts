import {Injectable} from '@angular/core';
import * as Steem from 'steem';
import {Post} from 'app/models/post';

@Injectable()
export class PostsService {

    posts: Map<string, Post[]> = new Map();
    replies: Map<string, Post[]>  = new Map();

    constructor() {
    }

    private toFlatArray = (all, current) => all.concat(current);

    getAllPostsAndComments(username: string): Promise<Post[]> {
        const query = {
            limit: 100,
            start_author: username
        };

        // use cache?
        return Promise.all([
            // Date string gets ignored, but set it to a far future just to be sure
            Steem.api.getDiscussionsByAuthorBeforeDate(username, '', '2100-01-01T00:00:00', 100),
            Steem.api.getDiscussionsByComments(query)
        ]).then(([posts, comments]) => {
            const allPosts = comments.concat(posts);

            this.posts.set(username, allPosts);

            return allPosts;
        });
    }

    getReplies(username: string): Promise<Post[]> {
        const posts = this.posts.get(username);
        const promises = posts.map((post: Post) => this.getPostReplies(post));

        // use cache?
        return Promise.all(promises).then(results => {
            const allReplies = results.reduce(this.toFlatArray, []);

            this.replies.set(username, allReplies);

            return allReplies;
        });
    }

    getPostReplies(post) {
        return Steem.api.getContentReplies(post.author, post.permlink);
    }
}
