import { NgModule } from '@angular/core';

import {AuthService} from "./auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {CategoryService} from "./category/category.service";
import {VideoService} from "./video/video.service";

@NgModule({
  providers: [
    AuthService,
    CategoryService,
    VideoService
  ],
  imports: [
    HttpClientModule,
  ],
})
export class ServiceModule { }
