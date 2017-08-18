import {BrowserModule} from '@angular/platform-browser';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routes';
import {CardComponent} from './card/card.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {FindUserComponent} from './find-user/find-user.component';
import {FollowersComponent} from './main/followers/followers.component';
import {FollowersResolver} from './user/followers-resolver.service';
import {FollowersService} from './user/followers.service';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {ReputationPipe} from './reputation.pipe';
import {RouterModule} from '@angular/router';
import {SideNavComponent} from './side-nav/side-nav.component';
import {UpvotesComponent} from './main/upvotes/upvotes.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserResolver} from './user/user-resolver.service';
import {UserService} from './user/user.service';
import {PostsService} from './user/posts.service';
import {SteemResolver} from "app/steem-resolver.service";
import {SteemService} from './steem.service';
import { SteemPowerPipe } from './steem-power.pipe';
import { RewardPipe } from './reward.pipe';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        FindUserComponent,
        FollowersComponent,
        UpvotesComponent,
        UserInfoComponent,
        ReputationPipe,
        MainComponent,
        HomeComponent,
        SideNavComponent,
        CardComponent,
        SteemPowerPipe,
        RewardPipe
    ],
    imports: [
        BrowserModule,
        ChartsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [
        FollowersService,
        FollowersResolver,
        PostsService,
        SteemResolver,
        SteemService,
        UserService,
        UserResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
