import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {FollowersService} from '../user/followers.service';
import {PostsService} from '../user/posts.service';
import {User} from 'app/models/user';

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    user: User = new User();

    constructor(private followersService: FollowersService,
        private postsService: PostsService,
        private userService: UserService) {
    }

    ngOnInit() {
        this.userService.currentUser$
            .subscribe(user => {
            this.user = user;

            this.followersService.fetchAllFollowers(user.name);
            this.followersService.fetchFollowCount(user.name);
            this.postsService.fetchAllComments(user.name);
            this.postsService.fetchAllPosts(user.name);
        });
    }
}
