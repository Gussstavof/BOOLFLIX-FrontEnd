import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs";

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

  createSignIn(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.URL, user, this.httpOptions)
  }

  createSignup(user: UserModel): Observable<UserModel>{
    const url = this.URL + "/signup";
    return this.httpClient.post<UserModel>(url, user, this.httpOptions)
  }
}
