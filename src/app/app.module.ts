import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FindUserComponent } from './find-user/find-user.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ReputationPipe } from './reputation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FindUserComponent,
    UserInfoComponent,
    ReputationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
