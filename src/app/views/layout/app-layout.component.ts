import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

type NavItem = { label: string; path: string; icon: 'home' | 'film' | 'grid' | 'user' };

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {
  constructor(public authService: AuthService, private router: Router) {}

  get navItems(): NavItem[] {
    const isAdmin = this.authService.isAdmin();
    return [
      { label: 'Inicio', path: '/', icon: 'home' },
      ...(isAdmin
        ? [
            { label: 'Videos', path: '/admin/videos', icon: 'film' },
            { label: 'Categorias', path: '/admin/categories', icon: 'grid' }
          ]
        : []),
      { label: 'Perfil', path: '/profile', icon: 'user' }
    ];
  }

  get initials(): string {
    const name = this.authService.getCurrentUser()?.username ?? 'U';
    return name.charAt(0).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/login');
  }
}

