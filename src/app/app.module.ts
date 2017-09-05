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
import {FollowersService} from './user/followers.service';
import {HomeComponent} from './home/home.component';
import {LinearProgressComponent} from './common/linear-progress/linear-progress.component';
import {MainComponent} from './main/main.component';
import {PostsService} from './user/posts.service';
import {ReputationPipe} from './common/pipes/reputation.pipe';
import {RewardPipe} from './common/pipes/reward.pipe';
import {RouterModule} from '@angular/router';
import {SideNavComponent} from './side-nav/side-nav.component';
import {SteemPowerPipe} from './common/pipes/steem-power.pipe';
import {SteemResolver} from 'app/steem-resolver.service';
import {SteemService} from './steem.service';
import {UpvoteChartComponent} from './upvote-chart/upvote-chart.component';
import {UpvotesComponent} from './main/upvotes/upvotes.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserLinkPipe} from './common/pipes/user-link.pipe';
import {UserResolver} from './user/user-resolver.service';
import {UserService} from './user/user.service';
import {VotePowerPipe} from './common/pipes/vote-power.pipe';
import { MadeWithLoveComponent } from './made-with-love/made-with-love.component';

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
        RewardPipe,
        UpvoteChartComponent,
        LinearProgressComponent,
        VotePowerPipe,
        UserLinkPipe,
        MadeWithLoveComponent
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
