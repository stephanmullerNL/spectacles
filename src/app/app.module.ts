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

@NgModule({
    declarations: [
        AppComponent,
        FindUserComponent,
        UserInfoComponent,
        ReputationPipe,
        MainComponent,
        HomeComponent
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
