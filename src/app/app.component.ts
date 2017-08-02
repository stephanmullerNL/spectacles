import {Component} from '@angular/core';
import {UserService} from './user.service';

@Component({
    providers: [
        UserService
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    error: string;
    username: string;
    user;

    // temp
    show: false;

    constructor(private userService: UserService) {
        // temp;
        this.onUserSelect('pilcrow');
    }

    onUserSelect(event: string): void {
        this.username = event;

        this.userService.getUserInfo(event)
            .then((user) => {
                this.error = null;
                this.user = user;
            })
            .catch((error) => {
                this.error = error;
                this.user = null;
            });
    }

}
