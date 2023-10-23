import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:8080/authentication"

  constructor(private httpClient: HttpClient) {
  }

  createSignIn(user: User): Observable<User> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        'Access-Control-Allow-Credentials': 'true'
      })

    };

    return this.httpClient.post<User>(this.url, user, httpOptions)
  }

  createSignup(user: User): Observable<User>{

    const url = this.url + "/signup";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        'Access-Control-Allow-Credentials': 'true'
      })
    };

    return this.httpClient.post<User>(url, user, httpOptions)
  }
}
