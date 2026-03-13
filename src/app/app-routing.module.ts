import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AppLayoutComponent } from './views/layout/app-layout.component';
import { HomeComponent } from './views/home/home.component';
import { VideoDetailComponent } from './views/videos/video-detail/video-detail.component';
import { CategoryDetailComponent } from './views/categories/category-detail/category-detail.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AdminVideosComponent } from './views/admin/admin-videos/admin-videos.component';
import { AdminCategoriesComponent } from './views/admin/admin-categories/admin-categories.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'signin', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },

  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', redirectTo: '', pathMatch: 'full' },

      { path: 'video/:id', component: VideoDetailComponent },
      { path: 'videos/:id', component: VideoDetailComponent },

      { path: 'category/:id', component: CategoryDetailComponent },
      { path: 'categories/:id', component: CategoryDetailComponent },

      { path: 'profile', component: ProfileComponent },

      { path: 'admin/videos', component: AdminVideosComponent, canActivate: [AdminGuard] },
      { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AdminGuard] }
    ]
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
