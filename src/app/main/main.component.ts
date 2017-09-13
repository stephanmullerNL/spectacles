import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {FollowersService} from '../user/followers.service';
import {PostsService} from '../user/posts.service';
import {User} from 'app/models/user';
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
        this.usersService.currentUser$.subscribe(user => this.onUserChange(user));
    }

    private onUserChange(user) {
        this.user = user;

        Promise.all([
            this.getAllRepliesPromise(user.name),
            this.getAllFollowerUsersPromise(user.name)
        ]).then(([replies, followerUsers]) => {
            this.followersService.setFollowerUsers(user.name, followerUsers);
            this.generateStats(user.name);
        });
    }

    private generateStats(username) {
        this.statsService.generateFollowerStats(username);
    }

    private getAllRepliesPromise(username) {
        return this.postsService.getAllPostsAndComments(username)
            .then(() => this.postsService.getReplies(username));
    }

    private getAllFollowerUsersPromise(username) {
        return this.followersService.getAllFollowers(username)
            .then(followers => {
                const usernames = followers.map(follower => follower.follower);
                return this.usersService.getUsers(usernames);
            });
    }
}
