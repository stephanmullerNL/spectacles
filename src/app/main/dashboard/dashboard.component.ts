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
    allDone: boolean;
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
        this.allDone = false;

        Observable.combineLatest(
            this.userService.currentUser$,
            this.followersService.followCount$
        ).subscribe(([currentUser, followCount]) => {
            if (currentUser.name !== followCount.account) {
                this.resetAll();
            }

            this.followCount = followCount;
            this.currentUser = currentUser;
        });
    }

    getTopFrequency(): string {
        return this.mostLoyal.length
            ? this.mostLoyal[0].stats.frequency.toFixed(2)
            : '-';
    }

    private resetAll(): void {
        // There must be a better way to do this
        this.updateAll([[], [], [], []]);
        this.allDone = false;
    }

    private updateAll([users, allPosts, replies]) {
        const stats = this.getUserStats(allPosts, users, replies);

        this.mostLoyal = stats
            .filter(user => user.stats.frequency > 0)
            .sort((a, b) => b.stats.frequency - a.stats.frequency);

        this.mostInfluential = stats
            .sort((a, b) => b.stats.totalShares - a.stats.totalShares);

        this.ghostFollowers = stats
            .filter(user => user.stats.frequency === 0);

        this.deadFollowers = stats
            .filter((user: User) => {
                const now = Date.now();
                const month = 1000 * 60 * 60 * 24 * 30;
                return now - user.stats.lastActive > month;
            });


        if (users.length === this.followCount.follower_count
            && allPosts.length === this.currentUser.post_count) {
            this.allDone = true;
        }
    }
}
