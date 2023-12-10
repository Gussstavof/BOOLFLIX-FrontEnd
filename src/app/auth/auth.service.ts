import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:8080/authentication"

  constructor(private httpClient: HttpClient) {
  }

  createSignIn(user: User): Observable<User> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient.post<User>(this.URL, user, httpOptions)
  }

  createSignup(user: User): Observable<User>{

    const url = this.URL + "/signup";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient.post<User>(url, user, httpOptions)
  }
}
