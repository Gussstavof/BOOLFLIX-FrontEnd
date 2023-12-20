import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ServiceModule} from "../../services/service.module";

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  exports: [
    SignupComponent,
    SigninComponent
  ],
})
export class AuthModule { }
