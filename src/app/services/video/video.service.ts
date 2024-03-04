import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageableModel} from "../../models/pageable.model";
import {CategoryModel} from "../../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private URL: string = "http://localhost:8080/videos"

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*',
    })
  };

  constructor(private httpClient: HttpClient) {
  }

}
