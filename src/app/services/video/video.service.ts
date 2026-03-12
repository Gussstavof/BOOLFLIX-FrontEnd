import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map} from 'rxjs';
import {VideoModel} from '../../models/video.model';
import {CategoryService} from '../category/category.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private readonly videosSubject = new BehaviorSubject<VideoModel[]>([]);
  readonly videos$ = this.videosSubject.asObservable();

  constructor(private categoryService: CategoryService) {
    const frontend = this.categoryService.getCategoryById('frontend');
    const backend = this.categoryService.getCategoryById('backend');
    const devops = this.categoryService.getCategoryById('devops');

    this.videosSubject.next([
      {
        id: '1',
        title: 'Angular Standalone Components',
        description: 'Entenda os conceitos práticos de standalone components no Angular.',
        category: frontend!,
        url: 'https://www.youtube.com/embed/KeFdy7RjH2c'
      },
      {
        id: '2',
        title: 'Node.js para APIs escaláveis',
        description: 'Boas práticas para estruturar APIs com Node.js e TypeScript.',
        category: backend!,
        url: 'https://www.youtube.com/embed/Oe421EPjeBE'
      },
      {
        id: '3',
        title: 'CI/CD com GitHub Actions',
        description: 'Pipeline de build e deploy automatizado para aplicações web.',
        category: devops!,
        url: 'https://www.youtube.com/embed/R8_veQiYBjI'
      }
    ]);
  }

  getVideos(categoryId?: string, searchTerm?: string): Observable<VideoModel[]> {
    return this.videos$.pipe(
      map(videos => videos.filter(video => {
        const matchesCategory = !categoryId || video.category.id === categoryId;
        const normalizedSearch = (searchTerm || '').trim().toLowerCase();
        const matchesSearch = !normalizedSearch || video.title.toLowerCase().includes(normalizedSearch);
        return matchesCategory && matchesSearch;
      }))
    );
  }
}
