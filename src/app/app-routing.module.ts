import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthHeaderComponent} from "./header/auth-header/auth-header.component";

const routes: Routes = [
  {
    path: 'sign-in',
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
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
