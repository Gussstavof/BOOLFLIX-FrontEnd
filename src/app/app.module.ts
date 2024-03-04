import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { FooterComponent } from './views/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthModule} from "./views/auth/auth.module";
import {HeaderModule} from "./views/header/header.module";
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


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    FilterComponent,
    VideosComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        ServiceModule,
        AppRoutingModule,
        AuthModule,
        HeaderModule,
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
