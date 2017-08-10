import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../models/user';
import {UserFollowCount} from '../../models/userFollowCount';
import {FollowersService} from '../../user/followers.service';
import {PostsService} from '../../user/posts.service';
import {getUrlScheme} from '@angular/compiler';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    lineChartData = [
        {data: [30, 15, 44, 65, 23, 104, 80], label: 'Upvotes per month'},
        {data: [30, 45, 99, 164, 187, 291, 371], label: 'Total upvotes'}
    ];
    lineChartLabels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    lineChartColors: Array<Object> = [
        { // dark grey
            backgroundColor: 'rgba(139,195,74,0.2)',
            borderColor: 'rgba(139,195,74,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(205,220,57,0.2)',
            borderColor: 'rgba(205,220,57,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }

    ];

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

    private updateAll(user) {
        this.user = user;

        const promises = [
            this.followersService.getFollowCountAsync(user.name),
            this.followersService.getFollowersAsync(user.name),
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
        const upvoters = this.postsService.getPostUpvoters(this.posts);
        const commenters = await this.postsService.getPostCommentersAsync(this.posts);

        return followers.map(follower => {
            const upvotes = upvoters[follower.follower] || 0;
            const comments = commenters[follower.follower] || 0;

            return Object.assign({}, follower, {
                upvotes: upvotes,
                comments: comments,
                frequency: ((upvotes + comments) / this.posts.length).toFixed(2),
                avgReward: Math.random().toFixed(2)
            });
        });
    }
}
