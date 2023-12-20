import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "./views/auth/signin/signin.component";
import {SignupComponent} from "./views/auth/signup/signup.component";
import {AuthHeaderComponent} from "./views/header/auth-header/auth-header.component";
import {HomeComponent} from "./views/home/home.component";

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
