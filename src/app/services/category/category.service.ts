import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map, of} from 'rxjs';
import {PageableModel} from '../../models/pageable.model';
import {CategoryModel} from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly categoriesSubject = new BehaviorSubject<CategoryModel[]>([
    {id: 'frontend', title: 'Front-End', color: '#2563EB'},
    {id: 'backend', title: 'Back-End', color: '#059669'},
    {id: 'devops', title: 'DevOps', color: '#7C3AED'}
  ]);

  readonly categories$ = this.categoriesSubject.asObservable();

  getAllCategories(): Observable<PageableModel> {
    return this.categories$.pipe(map(content => ({
      content,
      first: true,
      last: true,
      number: 0,
      numberOfElements: content.length,
      pageable: [],
      size: content.length,
      sort: 0,
      totalElements: content.length,
      totalPages: 1
    })));
  }

  getCategoryById(id: string): CategoryModel | undefined {
    return this.categoriesSubject.value.find(category => category.id === id);
  }

  getVideosByCategory(): Observable<PageableModel> {
    return of({
      content: [],
      first: true,
      last: true,
      number: 0,
      numberOfElements: 0,
      pageable: [],
      size: 0,
      sort: 0,
      totalElements: 0,
      totalPages: 0
    });
  }
}
