import {Component, Input, OnInit} from '@angular/core';
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
    user = new User();


    constructor(private userService: UserService,
                private followersService: FollowersService) {
    }

    ngOnInit() {
        this.userService.user$.subscribe(user => this.user = user);
        this.followersService.followCount$
            .subscribe(followCount => this.followCount = followCount);
    }

}
