import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { VideoDetailComponent } from './views/videos/video-detail/video-detail.component';
import { CategoryDetailComponent } from './views/categories/category-detail/category-detail.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AdminVideosComponent } from './views/videos/admin-videos/admin-videos.component';
import { AdminCategoriesComponent } from './views/categories/admin-categories/admin-categories.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'videos/:id', component: VideoDetailComponent, canActivate: [AuthGuard] },
  { path: 'categories/:id', component: CategoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/videos', component: AdminVideosComponent, canActivate: [AdminGuard] },
  { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
