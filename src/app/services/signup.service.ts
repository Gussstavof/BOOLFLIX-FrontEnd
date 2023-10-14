import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
} )
export class SignupService {

  private url = "http://localhost:8080/authentication/signup"
  constructor(private httpClient: HttpClient) { }

  create(user: User): Observable<User>{


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        'Access-Control-Allow-Credentials': 'true'
      })
    };

    return this.httpClient.post<User>(this.url, user, httpOptions)
  }
}
