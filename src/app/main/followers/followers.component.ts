import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {FollowCount} from '../../models/followers';
import {FollowersService} from '../../user/followers.service';
import {PostsService} from '../../user/posts.service';
import {UserService} from '../../user/user.service';
import {Observable} from 'rxjs/Rx';
import {VoteCounter} from '../../models/voteCounter';
import {StatsService} from '../../common/services/stats.service';

@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
    allDone: boolean;
    currentUser = new User();
    deadFollowers: User[] = [];
    followCount = new FollowCount();
    ghostFollowers: User[] = [];

    constructor(private followersService: FollowersService,
                private statsService: StatsService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.resetAll();

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

        this.statsService.followerStats$.subscribe(stats => {
            if (stats.length) {
                this.updateAll(stats);
            }
        });
    }

    private resetAll(): void {
        this.updateAll([]);
        this.allDone = false;
    }

    private updateAll(stats) {
        const month = 1000 * 60 * 60 * 24 * 30;
        const now = Date.now();

        this.ghostFollowers = stats
            .filter(user => user.stats.frequency === 0)
            .sort((a, b) => b.stats.lastActive - a.stats.lastActive);

        this.deadFollowers = stats
            .filter((user: User) => (now - user.stats.lastActive) > month)
            .sort((a, b) => b.stats.lastActive - a.stats.lastActive);

        this.allDone = true;
    }
}
