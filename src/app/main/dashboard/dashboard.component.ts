import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../models/user';
import {UserFollowCount} from '../../models/userFollowCount';
import {FollowersService} from '../../user/followers.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: User;
    followCount = new UserFollowCount();

    constructor(private userService: UserService,
                private followersService: FollowersService) {
        this.user = this.userService.getActiveUser();
    }

    ngOnInit() {
        this.followersService.getFollowCount(this.user.name).then((followCount: UserFollowCount) => {
            this.followCount = followCount;
        });
    }

}
