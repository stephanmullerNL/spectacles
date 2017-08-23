import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/distinctUntilChanged';

declare const ga: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router) {
        router.events.distinctUntilChanged((previous: any, current: any) => {
            if (current instanceof NavigationEnd) {
                return previous.url === current.url;
            }
            return true;
        }).subscribe((event: NavigationEnd) => {
            console.log('tracking?', event.url);
            ga('set', 'page', event.url);
            ga('send', 'pageview');
        });
    }
}
