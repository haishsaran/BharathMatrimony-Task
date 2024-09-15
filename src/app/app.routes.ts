import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TinderSwipeComponent } from './tinder-swipe/tinder-swipe.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';


export const routes: Routes = [

    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path:"home",
        component:HomeComponent
      },
      { path: 'tinter-swipe',
        component: TinderSwipeComponent 
      },

      { path: 'profile-details',
        component: ProfileDetailsComponent 
      }

      
];
