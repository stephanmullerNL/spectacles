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
    user = new User();
    followCount = new UserFollowCount();

    constructor(private userService: UserService,
                private followersService: FollowersService) {
    }

    ngOnInit() {
        this.userService.user$.subscribe(user => this.user = user);
        this.followersService.followCount$
            .subscribe(followCount => this.followCount = followCount);
    }

}
