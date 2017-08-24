import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';

@Component({
    selector: 'app-user-info',
    styleUrls: ['./user-info.component.scss'],
    templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
    @Input() user = new User();

    constructor() {
    }

    ngOnInit() {
        console.log(this.user);
    }

    getPictureUrl(): string {
        return `url(https://steemitimages.com/150x150/${this.user.profile.profile_image})`;
    }

}
