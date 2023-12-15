import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthModule} from "./auth/auth.module";
import {HeaderModule} from "./header/header.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from './home/filter/filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { VideosComponent } from './home/videos/videos.component';
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";


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
    AppRoutingModule,
    AuthModule,
    HeaderModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    FlexModule,
    MatCardModule
  ],
  providers: [],
  exports: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
