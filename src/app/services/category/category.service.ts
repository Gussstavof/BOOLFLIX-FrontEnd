import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageableModel} from "../../models/pageable.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL: string = "http://localhost:8080/categories";

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*',
    })
  };

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<PageableModel> {
    return this.httpClient.get<PageableModel>(this.URL, this.httpOptions);
  }

  getVideosByCategory(idCategory: string) : Observable<PageableModel> {
    const url = `${this.URL}/${idCategory}/videos?page=0&size=10&sort=string`;
    return this.httpClient.get<PageableModel>(url, this.httpOptions);
  }
}
