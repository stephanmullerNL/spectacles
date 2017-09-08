import { Component, OnInit } from '@angular/core';
import {StatsService} from 'app/common/services/stats.service';
import {FollowersService} from 'app/user/followers.service';
import {UserService} from '../../user/user.service';
import {Observable} from 'rxjs/Rx';
import {FollowCount} from '../../models/followers';
import {User} from '../../models/user';
import {Upvote} from '../../models/upvote';

@Component({
  selector: 'app-upvotes',
  templateUrl: './upvotes.component.html',
  styleUrls: ['./upvotes.component.scss']
})
export class UpvotesComponent implements OnInit {

  allDone: boolean;
  currentUser: User = new User();
  followCount: FollowCount = new FollowCount();
  mostReward: Upvote;
  upvotes: Upvote[] = [];

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
      const upvotes = this.statsService.upvotes.get(this.currentUser.name);

      if (stats.length && upvotes) {
        this.updateAll(stats, upvotes);
        this.allDone = true;
      }
    });
  }

  private resetAll(): void {
    this.updateAll([], []);
    this.allDone = false;
  }

  private updateAll(stats, upvotes) {
    this.upvotes = [...upvotes]
        .sort((a, b) => Date.parse(b.time) - Date.parse(a.time));

    this.mostReward = [...upvotes]
        .sort((a, b) => b.rshares - a.rshares)[0];

    // this.mostLoyal = stats
    //     .filter(user => user.stats.frequency > 0)
    //     .sort((a, b) => b.stats.frequency - a.stats.frequency);
    //
    // this.mostInfluential = stats
    //     .sort((a, b) => b.stats.totalShares - a.stats.totalShares);
    //
    // this.ghostFollowers = stats
    //     .filter(user => user.stats.frequency === 0);
    //
    // this.deadFollowers = stats
    //     .filter((user: User) => {
    //       const now = Date.now();
    //       const month = 1000 * 60 * 60 * 24 * 30;
    //       return now - user.stats.lastActive > month;
    //     });
  }
}
