import {Injectable} from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {UserService} from './user.service';
import {User} from '../models/user';


@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        const username: string = route.paramMap.get('username').substr(1);

        return this.userService.fetchCurrentUser(username).catch(error => {
            return this.router.navigate(['/oops', error]);
        });
    }
}
