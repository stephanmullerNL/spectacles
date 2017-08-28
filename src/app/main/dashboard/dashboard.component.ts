import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../models/user';
import {FollowCount} from '../../models/followers';
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
    currentUser = new User();
    deadFollowers: User[] = [];
    followCount = new FollowCount();
    ghostFollowers: User[] = [];
    mostInfluential: User[] = [];
    mostLoyal: User[] = [];

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
            ? this.mostLoyal[0].stats.frequency.toFixed(2)
            : '-';
    }

    private updateAll([followCount, followers, comments, posts]) {
        const allPosts = posts.concat(comments);
        console.log('all posts', allPosts);

        this.followCount = followCount;

        Observable.zip(
            this.getFollowerData(followers),
            this.postsService.getCommentsForPosts(allPosts)
        ).subscribe(([users, replies]) => {
            const stats = this.getUserStats(allPosts, users, replies);

            this.mostLoyal = stats
                .filter(user => user.stats.frequency > 0)
                .sort((a, b) => b.stats.frequency - a.stats.frequency);

            this.mostInfluential = stats
                .sort((a, b) => b.stats.totalShares - a.stats.totalShares);

            this.ghostFollowers = stats
                .filter(user => user.stats.frequency === 0);

            this.deadFollowers = stats
                .filter(user => user.stats.lastActivity);
        });
    }

    private getUserStats(posts, users, replies) {
        console.log('replies', replies);
        const commentCount = this.postsService.countPostsByAuthour(replies);
        console.log('count', commentCount);
        const upvotes = this.postsService.getAllPostUpvotes(posts);
        const upvoteCount = this.postsService.countUpvotesByUser(upvotes);

        return users.map((user: User) => {
            const voteCount = upvoteCount.get(user.name) || new VoteCounter();
            const comments = commentCount.get(user.name) || 0;

            user.stats = {
                avgReward: voteCount.rshares / (voteCount.count || 1),
                comments: comments,
                frequency: ((voteCount.count + comments) / posts.length),
                lastActive: this.userService.getLastActivity(user),
                reward: voteCount.rshares,
                totalShares: this.userService.getTotalShares(user),
                upvotes: voteCount.count
            };

            return user;
        });
    }


    private getFollowerData(followers) {
        const names = followers.map(follower => follower.follower);
        return this.userService.getUsers(names);
    }
}
