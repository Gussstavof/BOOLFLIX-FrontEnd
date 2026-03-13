import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageableModel } from '../../models/pageable.model';
import { CategoryModel } from '../../models/category.model';
import { VideoModel } from '../../models/video.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly URL = 'http://localhost:8080/categories';

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*'
    })
  };

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<PageableModel<CategoryModel>> {
    return this.httpClient.get<PageableModel<CategoryModel>>(this.URL, this.httpOptions);
  }

  getCategoryById(id: string): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(`${this.URL}/${id}`, this.httpOptions);
  }

  createCategory(category: Omit<CategoryModel, 'id'>): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(this.URL, category, this.httpOptions);
  }

  updateCategory(id: string, category: Partial<Omit<CategoryModel, 'id'>>): Observable<CategoryModel> {
    return this.httpClient.put<CategoryModel>(`${this.URL}/${id}`, category, this.httpOptions);
  }

  deleteCategory(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/${id}`, this.httpOptions);
  }

  getVideosByCategory(idCategory: string): Observable<PageableModel<VideoModel>> {
    return this.httpClient.get<PageableModel<VideoModel>>(`${this.URL}/${idCategory}/videos`, this.httpOptions);
  }
}

