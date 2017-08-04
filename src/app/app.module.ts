import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FindUserComponent} from './find-user/find-user.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {ReputationPipe} from './reputation.pipe';
import {AppRoutes} from './app.routes';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';
import {UserService} from './user/user.service';
import {UserResolver} from './user/user-resolver.service';
import {SideNavComponent} from './side-nav/side-nav.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {FollowersComponent} from './main/followers/followers.component';
import {UpvotesComponent} from './main/upvotes/upvotes.component';
import { CardComponent } from './card/card.component';

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
        CardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [
        UserService,
        UserResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
