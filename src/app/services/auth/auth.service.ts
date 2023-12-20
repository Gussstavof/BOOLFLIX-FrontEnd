import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs";
import {TokenModel} from "../../models/token.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = "http://localhost:8080/authentication"

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  createSignIn(user: UserModel): Observable<HttpResponse<TokenModel>> {
     return this.httpClient.post<TokenModel>(
        this.URL,
        user,
       {
         ...this.httpOptions,
         observe: 'response'
       }
      )

  }
  createSignup(user: UserModel): Observable<HttpResponse<TokenModel>> {
    const url = this.URL + "/signup";
    return this.httpClient.post<TokenModel>(
      url,
      user,
      {
        ...this.httpOptions,
        observe: 'response'
      }
    );
  }
}
