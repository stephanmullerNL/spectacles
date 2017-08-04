import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user/user';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent {
    @Input() user: User;
}
