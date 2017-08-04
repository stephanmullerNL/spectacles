import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
    selector: 'app-main',
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
        this.user = this.userService.getUser();
    }
}
