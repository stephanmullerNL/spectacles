import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    user;

    constructor(private userService: UserService) {
        console.log(userService.user);
    }

    ngOnInit() {
        this.user = this.userService.user;
    }

}
