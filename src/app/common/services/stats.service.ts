import {Injectable} from '@angular/core';

@Injectable()
export class StatsService {

    stats = [];

    constructor() {
    }

    createFollowerStats(currentUser, data) {

        const newStats = [...data.users].map((user) => {

            const voteCount = 91;
            const voteShares = 123123;
            const commentCount = this.countCommentsBy(data.replies, user);

            const userStats = {
                upvotes: voteCount,
                avgReward: voteShares / (voteCount || 1),
                comments: commentCount,
                frequency: ((voteCount + commentCount) / data.posts.length),
                reward: voteShares,
            }
        });

        // next()
        this.stats = newStats;

    }

    countCommentsBy(replies, user) {
        // cache!
        return replies.filter(reply => reply.author === user.name).length;
    }

}
