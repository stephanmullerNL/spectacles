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
      if (stats.length) {
        this.updateAll(stats);
        this.allDone = true;
      }
    });
  }

  private resetAll(): void {
    this.updateAll([]);
    this.allDone = false;
  }

  private updateAll(stats) {
    console.log(this.statsService.upvotes.get(this.currentUser.name));
    this.upvotes = (this.statsService.upvotes.get(this.currentUser.name) || [])
        .sort((a, b) => b.rshares - a.rshares)
        .slice(0, 10);


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
