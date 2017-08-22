import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../models/user';
import {FollowCount} from '../../models/followers';
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
    followCount = new FollowCount();
    followers = [];
    following = [];
    posts = [];
    upvotesByMonth = [];

    user = new User();

    constructor(private followersService: FollowersService,
                private postsService: PostsService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userService.user$.subscribe(this.updateAll.bind(this));
    }

    private updateAll(user: User) {
        const followers = this.followersService.getFollowers();

        this.followCount = this.followersService.getFollowCount();
        this.posts = this.postsService.getPosts();
        this.user = user;

        this.allPostUpvotes = this.postsService.getAllPostUpvotes(this.posts);
        this.upvotesByMonth = this.postsService.groupUpvotesByMonth(this.allPostUpvotes);

        this.extendFollowersAsync(followers).then((result) => {
            // Do this in ngFor later
            this.followers = result.sort((a, b) => b.frequency - a.frequency);
        });
    }

    private async extendFollowersAsync(followers) {
        const upvoters = this.postsService.groupUpvotesByUser(this.allPostUpvotes);
        const commenters = await this.postsService.getPostCommenters(this.posts, followers);

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
