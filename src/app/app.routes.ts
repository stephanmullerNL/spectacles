import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {UserResolver} from './user-resolver.service';

export const AppRoutes: Routes = [
    {
        path: ':username',
        component: MainComponent,
        resolve: {
            user: UserResolver
        }
    },
    {
        path: '',
        component: HomeComponent
    }
];