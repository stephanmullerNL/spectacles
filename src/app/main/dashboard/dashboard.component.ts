import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../models/user';
import {FollowCount, Follower} from '../../models/followers';
import {FollowersService} from '../../user/followers.service';
import {PostsService} from '../../user/posts.service';
import {VoteCounter} from '../../models/voteCounter';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    followCount = new FollowCount();
    mostInfluential: User[] = [];
    mostLoyal: User[] = [];
    currentUser = new User();

    constructor(private followersService: FollowersService,
                private postsService: PostsService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userService.currentUser$.subscribe(user => {
            this.currentUser = user;

            // There must be a better way to do this
            this.updateAll([[], [], [], []]);
        });

        Observable.zip(
            this.followersService.followCount$,
            this.followersService.followers$,
            this.postsService.comments$,
            this.postsService.posts$
        ).subscribe(result => this.updateAll(result));
    }

    getTopFrequency(): string {
        return this.mostLoyal.length
            ? this.mostLoyal[0].stats.frequency.toString()
            : '-';
    }

    private updateAll([followCount, followers, comments, posts]) {
        const allPosts = posts.concat(comments);

        this.followCount = followCount;

        Observable.zip(
            this.getFollowerData(followers),
            this.postsService.getCommentsForPosts(allPosts)
        ).subscribe(([users, replies]) => {
            this.createStatistics(followers, allPosts, users, replies);
        });
    }

    private createStatistics(followers, posts, users, replies) {
        const commentCount = this.postsService.countPostsByAuthour(replies);
        const followerNames = followers.map(follower => follower.follower);
        const upvotes = this.postsService.getAllPostUpvotes(posts);
        const upvoters = this.postsService.groupUpvotesByUser(upvotes);
        const toNumber = str => Number(str.split(' ')[0]);

        const userStats = users.map((user: User) => {
            const voteCount = upvoters.get(user.name) || new VoteCounter();
            const comments = commentCount.get(user.name) || 0;

            user.stats = {
                avgReward: voteCount.rshares / (voteCount.count || 1),
                comments: comments,
                frequency: ((voteCount.count + comments) / posts.length).toFixed(2),
                lastActive: this.getLastActivity(user),
                reward: voteCount.rshares,
                totalShares: toNumber(user.vesting_shares)
                 + toNumber(user.delegated_vesting_shares) - toNumber(user.received_vesting_shares),
                upvotes: voteCount.count
            };

            return user;
        });

        // temp
        this.mostLoyal = userStats
            .filter(user => user.stats.frequency > 0)
            .sort((a, b) => b.stats.frequency - a.stats.frequency);

        this.mostInfluential = userStats
            .sort((a, b) => b.stats.totalShares - a.stats.totalShares);

        console.log(this.mostInfluential);
    }

    private getLastActivity(user: User) {
        const toNum = string => Number(string.substr(0, 10).replace('-', ''))
        const lastPost = toNum(user.last_post);
        const lastVote = toNum(user.last_vote_time);

        return lastPost > lastVote ? user.last_post : user.last_vote_time;
    }

    private getFollowerData(followers) {
        const names = followers.map(follower => follower.follower);
        return this.userService.getUsers(names);
    }
}
