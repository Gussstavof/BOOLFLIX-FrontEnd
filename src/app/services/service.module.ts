import { NgModule } from '@angular/core';

import {AuthService} from "./auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {CategoryService} from "./category/category.service";

@NgModule({
  providers: [
    AuthService,
    CategoryService
  ],
  imports: [
    HttpClientModule,
  ],
})
export class ServiceModule { }
