import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../models/user';
import {FollowCount, Follower} from '../../models/followers';
import {FollowersService} from '../../user/followers.service';
import {PostsService} from '../../user/posts.service';
import {VoteCounter} from '../../models/voteCounter';
import {Post} from '../../models/post';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    followCount = new FollowCount();
    mostLoyal: Follower[] = [];
    user = new User();

    constructor(private followersService: FollowersService,
                private postsService: PostsService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userService.currentUser$.subscribe(user => {
            this.user = user;

            // There must be a better way to do this
            this.updateAll([[], [], [], []]);
        });

        Observable.zip(
            this.followersService.followCount$,
            this.followersService.followers$,
            this.postsService.comments$,
            this.postsService.posts$
        )

            .subscribe(this.updateAll.bind(this));

    }

    private updateAll([followCount, followers, comments, posts]) {
        const allPosts = posts.concat(comments);
        const upvotes = this.postsService.getAllPostUpvotes(allPosts);

        this.followCount = followCount;

        this.extendFollowersAsync(followers, allPosts, upvotes).then(result => {
            this.mostLoyal = result;
        });
    }

    private async extendFollowersAsync(followers, posts, upvotes) {
        const commenters = await this.postsService.getPostCommenters(posts);
        const upvoters = this.postsService.groupUpvotesByUser(upvotes);

        return followers.map(follower => {
            const coteCount = upvoters[follower.follower] || new VoteCounter();
            const comments = commenters[follower.follower] || 0;
            return {
                name: follower.follower,
                upvotes: coteCount.count,
                comments: comments,
                frequency: ((coteCount.count + comments) / posts.length).toFixed(2),
                avgReward: coteCount.rshares / (coteCount.count || 1),
                reward: coteCount.rshares
            };
        }).filter(follower => follower.frequency > 0)
            .sort((a, b) => b.frequency - a.frequency);
    }
}
