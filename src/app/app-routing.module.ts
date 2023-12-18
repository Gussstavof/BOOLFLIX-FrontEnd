import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthHeaderComponent} from "./header/auth-header/auth-header.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    data: {
      headerComponent: AuthHeaderComponent
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      headerComponent: AuthHeaderComponent
    }
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
