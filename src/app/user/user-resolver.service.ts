import {Injectable} from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {UserService} from './user.service';
import {User} from '../models/user';
import {FollowersService} from './followers.service';
import {PostsService} from './posts.service';


@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private followersService: FollowersService,
                private postsService: PostsService,
                private router: Router,
                private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        const username: string = route.paramMap.get('username').substr(1);

        // Fire and forget
        // this.followersService.fetchAllFollowers(username);
        // this.postsService.fetchAllPostsAndComments(username);
        this.followersService.fetchFollowCount(username);

        return this.userService.fetchCurrentUser(username).catch(error => {
            return this.router.navigate(['/oops', error]);
        });
    }
}
