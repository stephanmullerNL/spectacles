import {Component, Input} from '@angular/core';
import {User} from '../models/user';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent {
    @Input() user: User;
}
