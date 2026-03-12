import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './views/auth/auth.module';
import { HeaderModule } from './views/header/header.module';
import { FooterComponent } from './views/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { FilterComponent } from './views/home/filter/filter.component';
import { VideosComponent } from './views/home/videos/videos.component';
import { ServiceModule } from './services/service.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { VideoDetailComponent } from './views/videos/video-detail/video-detail.component';
import { CategoryDetailComponent } from './views/categories/category-detail/category-detail.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AdminVideosComponent } from './views/videos/admin-videos/admin-videos.component';
import { AdminCategoriesComponent } from './views/categories/admin-categories/admin-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    FilterComponent,
    VideosComponent,
    VideoDetailComponent,
    CategoryDetailComponent,
    ProfileComponent,
    AdminVideosComponent,
    AdminCategoriesComponent
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
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
