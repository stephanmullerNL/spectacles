import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FollowersService} from '../user/followers.service';
import {PostsService} from '../user/posts.service';

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    user;

    ready = false;

    constructor(private followersService: FollowersService,
        private postsService: PostsService,
        private userService: UserService) {
    }

    ngOnInit() {
        this.userService.user$.subscribe(user => {
            this.ready = false;
            this.user = user;

            Promise.all([
                this.followersService.fetchAllFollowers(user.name),
                this.followersService.fetchFollowCount(user.name),
                this.postsService.fetchAllPosts(user.name)
            ]).then(() => this.ready = true);
        });
    }
}
