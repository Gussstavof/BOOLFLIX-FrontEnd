import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthCredentials, UserModel, UserRole } from '../../models/user.model';
import { TokenModel } from '../../models/token.model';

interface JwtPayload {
  sub?: string;
  email?: string;
  username?: string;
  role?: UserRole;
  exp?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly URL = 'http://localhost:8080/authentication';
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  login(credentials: AuthCredentials): Observable<HttpResponse<TokenModel>> {
    return this.httpClient
      .post<TokenModel>(this.URL, credentials, { ...this.httpOptions, observe: 'response' })
      .pipe(map((res) => this.persistAuth(res, credentials)));
  }

  signup(credentials: AuthCredentials): Observable<HttpResponse<TokenModel>> {
    return this.httpClient
      .post<TokenModel>(`${this.URL}/signup`, credentials, { ...this.httpOptions, observe: 'response' })
      .pipe(map((res) => this.persistAuth(res, credentials)));
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const payload = this.getPayload();
    if (!payload) return false;
    if (!payload.exp) return true;
    return payload.exp * 1000 > Date.now();
  }

  getCurrentUser(): UserModel | null {
    const stored = sessionStorage.getItem(this.USER_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as UserModel;
      } catch {
        // Fall through to token decode.
      }
    }

    const payload = this.getPayload();
    if (!payload) return null;

    const email = payload.email ?? payload.sub ?? '';
    const username = payload.username ?? (email ? email.split('@')[0] : 'User');
    const role = payload.role ?? (email.toLowerCase().includes('adm') ? 'ADM' : 'USER');
    return { username, email, role };
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'ADM';
  }

  private persistAuth(res: HttpResponse<TokenModel>, credentials: AuthCredentials): HttpResponse<TokenModel> {
    const token = res.body?.token;
    if (!token) return res;

    sessionStorage.setItem(this.TOKEN_KEY, token);

    const payload = this.getPayload(token);
    const email = payload?.email ?? payload?.sub ?? credentials.email;
    const username = payload?.username ?? credentials.username ?? (email ? email.split('@')[0] : 'User');
    const role = payload?.role ?? (email.toLowerCase().includes('adm') ? 'ADM' : 'USER');

    sessionStorage.setItem(this.USER_KEY, JSON.stringify({ username, email, role } satisfies UserModel));
    return res;
  }

  private getPayload(tokenOverride?: string): JwtPayload | null {
    const token = tokenOverride ?? this.getToken();
    if (!token) return null;

    try {
      const [, payload] = token.split('.');
      if (!payload) return null;
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(json) as JwtPayload;
    } catch {
      return null;
    }
  }
}

