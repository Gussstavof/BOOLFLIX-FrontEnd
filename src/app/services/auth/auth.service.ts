import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserModel, UserRole } from '../../models/user.model';
import { TokenModel } from '../../models/token.model';

interface JwtPayload {
  sub: string;
  role?: UserRole;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = 'http://localhost:8080/authentication';
  private readonly TOKEN_KEY = 'token';

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  login(user: UserModel): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(this.URL, user, this.httpOptions).pipe(
      map((response) => {
        this.saveToken(response.token);
        return response;
      })
    );
  }

  signup(user: UserModel): Observable<HttpResponse<TokenModel>> {
    return this.httpClient
      .post<TokenModel>(`${this.URL}/signup`, user, {
        ...this.httpOptions,
        observe: 'response'
      })
      .pipe(
        map((response) => {
          if (response.body?.token) {
            this.saveToken(response.body.token);
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const payload = this.getPayload();
    if (!payload) return false;
    if (!payload.exp) return true;
    return payload.exp * 1000 > Date.now();
  }

  getUserRole(): UserRole {
    return this.getPayload()?.role ?? 'USER';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADM';
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private getPayload(): JwtPayload | null {
    const token = this.getToken();
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
