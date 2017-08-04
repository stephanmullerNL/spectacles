import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    user;

    // temp
    show: false;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.user = this.route.snapshot.data['user'];
    }
}
