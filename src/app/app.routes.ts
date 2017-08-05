import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {UserResolver} from './user/user-resolver.service';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {FollowersComponent} from './main/followers/followers.component';
import {UpvotesComponent} from './main/upvotes/upvotes.component';
import {FollowersResolver} from "./user/followers-resolver.service";


export const AppRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':username',
        component: MainComponent,
        resolve: {
            user: UserResolver
        },
        children: [
            // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {
                path: '',
                component: DashboardComponent,
                resolve: {
                    followCount: FollowersResolver
                }
            },
            {path: 'followers', component: FollowersComponent},
            {path: 'upvotes', component: UpvotesComponent}
        ]
    }
];
