import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthModule} from "./views/auth/auth.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { FilterComponent } from './views/home/filter/filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { VideosComponent } from './views/home/videos/videos.component';
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {ServiceModule} from "./services/service.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { AppLayoutComponent } from './views/layout/app-layout.component';
import { ProfileComponent } from './views/profile/profile.component';
import { VideoDetailComponent } from './views/videos/video-detail/video-detail.component';
import { CategoryDetailComponent } from './views/categories/category-detail/category-detail.component';
import { AdminVideosComponent } from './views/admin/admin-videos/admin-videos.component';
import { AdminCategoriesComponent } from './views/admin/admin-categories/admin-categories.component';
import { NotFoundComponent } from './views/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterComponent,
    VideosComponent,
    AppLayoutComponent,
    ProfileComponent,
    VideoDetailComponent,
    CategoryDetailComponent,
    AdminVideosComponent,
    AdminCategoriesComponent,
    NotFoundComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        ServiceModule,
        AppRoutingModule,
        AuthModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSelectModule,
        FlexModule,
        MatCardModule,
        FormsModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  exports: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
