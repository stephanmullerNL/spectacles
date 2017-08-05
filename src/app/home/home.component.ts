import {Component} from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    error: string;

    constructor() {
    }

    onError($event) {
        this.error = $event;
    }
}
