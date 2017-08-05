import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    user;

    // temp
    show: false;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.user$.subscribe(user => this.user = user);
    }
}
