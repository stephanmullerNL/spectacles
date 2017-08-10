import {Injectable} from '@angular/core';
import {
    Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {FollowersService} from './followers.service';

@Injectable()
export class FollowersResolver implements Resolve<any> {
    constructor(private followersService: FollowersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        const username = route.paramMap.get('username').substr(1);

        return this.followersService
            .getFollowCountAsync(username);
    }
}
