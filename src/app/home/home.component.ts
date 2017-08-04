import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {User} from '../user/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    error: string;

    constructor(private router: Router,
                private userService: UserService) {
    }

    onUserSelect($event) {
        this.userService.getUser($event)
            .then((user: User) => {
                this.router.navigate(['/', `@${user.name}`]);
            })
            .catch((error) => {
                this.error = error;
            });
    }
}
