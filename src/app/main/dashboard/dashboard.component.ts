import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../models/user';
import {FollowCount, Follower} from '../../models/followers';
import {FollowersService} from '../../user/followers.service';
import {PostsService} from '../../user/posts.service';
import {VoteCounter} from '../../models/voteCounter';
import {Post} from '../../models/post';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private posts: Post[] = [];

    allPostUpvotes = [];
    followCount = new FollowCount();
    followers = [];
    upvotesByMonth = [];

    user = new User();

    constructor(private followersService: FollowersService,
                private postsService: PostsService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.followersService.followCount$.subscribe(this.onFollowCountUpdate);
        this.followersService.followers$.subscribe(this.onFollowersUpdate);
        this.postsService.posts$.subscribe(this.onPostsUpdate);
        this.userService.user$.subscribe(this.onUserUpdate);
    }

    private onFollowersUpdate(followers: Follower[]) {
        this.followers = followers;

        this.extendFollowersAsync(followers).then((result) => {
            // Do this in ngFor later
            this.followers = result.sort((a, b) => b.frequency - a.frequency);
        });
    }

    private onFollowCountUpdate(followCount: FollowCount) {
        this.followCount = followCount;
    }

    private onPostsUpdate(posts: Post[]) {
        this.posts = posts;
        this.allPostUpvotes = this.postsService.getAllPostUpvotes(posts);
    }

    private onUserUpdate(user: User) {
        this.user = user;
    }

    private updateAll() {
        this.upvotesByMonth = this.postsService.groupUpvotesByMonth(this.allPostUpvotes);
    }

    private async extendFollowersAsync(followers) {
        const upvoters = this.postsService.getAllPostUpvotes(this.posts);
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
