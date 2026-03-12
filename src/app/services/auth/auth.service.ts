import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TokenModel} from '../../models/token.model';
import {SessionUser, UserModel, UserRole} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private readonly currentUserSubject = new BehaviorSubject<SessionUser | null>(this.readStoredUser());
  readonly currentUser$ = this.currentUserSubject.asObservable();

  createSignIn(user: UserModel): Observable<HttpResponse<TokenModel>> {
    const role: UserRole = user.email.toLowerCase().includes('adm') ? 'ADM' : 'USER';
    const sessionUser: SessionUser = {
      username: user.username?.trim() || user.email.split('@')[0],
      email: user.email,
      role
    };

    const token = btoa(`${user.email}:${Date.now()}`);
    this.persistSession(token, sessionUser);

    return of(new HttpResponse<TokenModel>({status: 200, body: {token}}));
  }

  createSignup(user: UserModel): Observable<HttpResponse<TokenModel>> {
    const role: UserRole = user.email.toLowerCase().includes('adm') ? 'ADM' : 'USER';
    const sessionUser: SessionUser = {
      username: user.username?.trim() || user.email.split('@')[0],
      email: user.email,
      role
    };

    const token = btoa(`${user.email}:${Date.now()}`);
    this.persistSession(token, sessionUser);

    return of(new HttpResponse<TokenModel>({status: 201, body: {token}}));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'ADM';
  }

  getCurrentUser(): SessionUser | null {
    return this.currentUserSubject.value;
  }

  private persistSession(token: string, user: SessionUser): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private readStoredUser(): SessionUser | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as SessionUser;
    } catch {
      localStorage.removeItem(this.USER_KEY);
      return null;
    }
  }
}
