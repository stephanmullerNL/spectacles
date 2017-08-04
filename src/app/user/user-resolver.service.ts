import {Injectable} from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {UserService} from './user.service';


@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        const username = route.paramMap.get('username').substr(1);

        return this.userService.getUser(username).then(user => {
            if (user) {
                return user;
            } else {
                this.router.navigate(['/oops']);
                return null;
            }
        });
    }
}
