import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {User} from '../../models/user';
import {VoteCounter} from '../../models/voteCounter';
import {PostsService} from '../../user/posts.service';
import {FollowersService} from '../../user/followers.service';
import {Upvote} from '../../models/upvote';

@Injectable()
export class StatsService {

    private followerStats = new BehaviorSubject<User[]>([]);

    followerStats$ = this.followerStats.asObservable();

    upvotes: Map<string, Upvote[]> = new Map();

    constructor(private followersService: FollowersService,
                private postsService: PostsService) {
    }

    generateFollowerStats(username) {
        const followerUsers = this.followersService.followerUsers.get(username);
        const posts = this.postsService.posts.get(username);
        const replies = this.postsService.replies.get(username);
        const upvotes = this.getAllPostUpvotes(username, posts);
        console.log(upvotes);

        const commentCount = this.countPostsByAuthour(replies);
        const upvoteCount = this.countUpvotesByUser(upvotes);
        const userWithStats: User[] = [...followerUsers].map((user) => {

            const voteCount = upvoteCount.get(user.name) || new VoteCounter();
            const comments = commentCount.get(user.name) || 0;

            const userStats = {
                avgReward: voteCount.rshares / (voteCount.count || 1),
                comments: comments,
                frequency: ((voteCount.count + comments) / posts.length),
                lastActive: this.getLastActivity(user),
                totalShares: this.getTotalShares(user),
                reward: voteCount.rshares,
                upvotes: voteCount.count,
            };

            return Object.assign({}, user, {
                stats: userStats
            });
        });

        this.followerStats.next(userWithStats);
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

    getAllPostUpvotes(username, posts) {
        const upvotes = posts.reduce((all, post) => {
            const votes = [...post.active_votes].map(vote => Object.assign(vote, {post: post}));
            return all.concat(votes);
        }, []);

        this.upvotes.set(username, upvotes);

        return upvotes;
    }

    getLastActivity(user: User): number {
        const lastPost = Date.parse(user.last_post);
        const lastVote = Date.parse(user.last_vote_time);

        return Math.max(lastPost, lastVote);
    }

    getTotalShares(user: User) {
        const toNumber = str => Number(str.split(' ')[0]);

        return toNumber(user.vesting_shares) - toNumber(user.delegated_vesting_shares)
            + toNumber(user.received_vesting_shares);
    }

}
