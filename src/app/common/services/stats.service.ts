import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../models/user';
import {VoteCounter} from '../../models/voteCounter';

@Injectable()
export class StatsService {

     private followerStats = new BehaviorSubject<User[]>([]);

    followerStats$ = this.followerStats.asObservable();

    constructor() {
    }

    generateFollowerStats(data) {
        const commentCount = this.countPostsByAuthour(data.replies);
        const upvotes = this.getAllPostUpvotes(data.posts);
        const upvoteCount = this.countUpvotesByUser(upvotes);

        const userWithStats: User[] = [...data.followers].map((user) => {

            const voteCount = upvoteCount.get(user.name) || new VoteCounter();
            const comments = commentCount.get(user.name) || 0;

            const userStats = {
                avgReward: voteCount.rshares / (voteCount.count || 1),
                comments: comments,
                frequency: ((voteCount.count + comments) / data.posts.length),
                lastActive: this.getLastActivity(user),
                totalShares: this.getTotalShares(user),
                reward: voteCount.rshares,
                upvotes: voteCount.count,
            };

            return Object.assign({}, user, {
                stats: userStats
            });
        });

        // next()
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

    countCommentsBy(replies, user) {
        // cache!
        return replies.filter(reply => reply.author === user.name).length;
    }

    getAllPostUpvotes(posts) {
        return posts.reduce((all, post) => {
            return all.concat(post.active_votes);
        }, []);
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
