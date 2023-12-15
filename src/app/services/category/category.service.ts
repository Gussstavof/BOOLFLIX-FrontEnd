import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageableModel} from "../../models/pageable.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL: string = "http://localhost:8080/categories"

  /*
   private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
   */
  constructor(private httpClient: HttpClient) {
  }

  getAllCategories(token: string) : Observable<PageableModel> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'accept': '*/*',
        'Authorization': 'Bearer ' + token
      })
    }

    console.log(httpOptions)
    return this.httpClient.get<PageableModel>(this.URL, httpOptions)
  }
}
