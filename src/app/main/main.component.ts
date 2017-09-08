import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {FollowersService} from '../user/followers.service';
import {PostsService} from '../user/posts.service';
import {User} from 'app/models/user';
import {Observable} from 'rxjs/Rx';
import {Post} from '../models/post';
import {StatsService} from '../common/services/stats.service';

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    user: User = new User();

    constructor(private followersService: FollowersService,
                private postsService: PostsService,
                private statsService: StatsService,
                private usersService: UserService) {
    }

    ngOnInit() {
        this.usersService.currentUser$.subscribe(user => {
            let allPosts;

            this.user = user;

            const allRepliesPromise = this.postsService.getAllPostsAndComments(user.name)
                .then((posts: Post[]) => {
                    allPosts = posts;
                    return this.postsService.getReplies(posts);
                });

            const followersPromise = this.followersService.getAllFollowers(user.name)
                .then(followers => {
                    const usernames = followers.map(follower => follower.follower);
                    return this.usersService.getUsers(usernames);
                });

            Promise.all([
                allRepliesPromise,
                followersPromise
            ]).then(([replies, followers]) => {
                this.statsService.generateFollowerStats({
                    posts: allPosts,
                    replies: replies,
                    followers: followers
                });
            });
        });
    }
}
