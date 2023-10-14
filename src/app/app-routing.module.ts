import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormSignupComponent} from "./components/form-signup/form-signup.component";
import {FormSigninComponent} from "./components/form-signin/form-signin.component";

const routes: Routes = [
  {
    path: 'signin',
    component: FormSigninComponent
  },
  {
    path: 'signup',
    component: FormSignupComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
