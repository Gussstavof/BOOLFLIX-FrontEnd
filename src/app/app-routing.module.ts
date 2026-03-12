import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './views/auth/signin/signin.component';
import {SignupComponent} from './views/auth/signup/signup.component';
import {AuthHeaderComponent} from './views/header/auth-header/auth-header.component';
import {HomeComponent} from './views/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminComponent} from './views/admin/admin.component';
import {AdminGuard} from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    data: {
      headerComponent: AuthHeaderComponent
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      headerComponent: AuthHeaderComponent
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
