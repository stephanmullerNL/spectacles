import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-user-info',
    styleUrls: ['./user-info.component.css'],
    templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
    @Input() user: string;

    constructor() {
    }

    ngOnInit() {
        console.log(this.user);
    }

}
