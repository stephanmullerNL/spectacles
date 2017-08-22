import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../models/user';
import {UserFollowCount} from '../../models/userFollowCount';
import {FollowersService} from '../../user/followers.service';
import {PostsService} from '../../user/posts.service';
import {VoteCounter} from '../../models/voteCounter';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    allPostUpvotes = [];
    followCount = new UserFollowCount();
    followers = [];
    following = [];
    posts = [];

    user = new User();

    constructor(private followersService: FollowersService,
                private postsService: PostsService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userService.user$.subscribe(user => this.updateAll(user));
    }

    resetDisplayValues() {
        this.followers = [];
        this.followCount = new UserFollowCount();
    }

    private updateAll(user) {
        this.resetDisplayValues();

        this.user = user;

        const promises = [
            this.followersService.getFollowCount(user.name),
            this.followersService.getFollowers(user.name),
            this.postsService.getPostsByUserAsync(user.name)
        ];

        Promise.all(promises).then(([followCount, followers, posts]) => {
            this.followCount = followCount;
            this.posts = posts;

            this.extendFollowersAsync(followers).then(result => {
                this.followers = result;

                // Do this in ngFor later
                this.followers.sort((a, b) => b.frequency - a.frequency);
            });
        });
    }

    private async extendFollowersAsync(followers) {
        const upvoters = this.postsService.getPostUpvoteCounts(this.posts);
        const commenters = await this.postsService.getPostCommenters(this.posts);

        return followers.map(follower => {
            const upvotes = upvoters[follower.follower] || new VoteCounter();
            const comments = commenters[follower.follower] || 0;

            return Object.assign({}, follower, {
                upvotes: upvotes.count,
                comments: comments,
                frequency: ((upvotes.count + comments) / this.posts.length).toFixed(2),
                avgReward: upvotes.rshares / (upvotes.count || 1),
                reward: upvotes.rshares
            });
        });
    }
}
