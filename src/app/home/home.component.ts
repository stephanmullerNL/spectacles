import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    error;

    constructor(private router: Router,
                private userService: UserService) {
    }

    onUserSelect($event) {
        this.userService.fetchUser($event)
            .then((user) => {
                this.router.navigate(['/', `@${user.name}`]);
            })
            .catch((error) => {
                this.error = error;
            });
    }
}
