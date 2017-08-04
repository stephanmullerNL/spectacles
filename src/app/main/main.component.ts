import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

    constructor(private route: ActivatedRoute,
                private userService: UserService) {

    }

    ngOnInit() {
        // this.user = this.route.snapshot.data['user'];
        this.user = this.userService.getUser();
    }


    onUserSelect(event: string): void {

    }
}
