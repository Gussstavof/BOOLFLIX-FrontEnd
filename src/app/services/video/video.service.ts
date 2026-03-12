import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageableModel } from '../../models/pageable.model';
import { VideoModel } from '../../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private readonly URL = 'http://localhost:8080/videos';

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*'
    })
  };

  constructor(private httpClient: HttpClient) {}

  getVideos(): Observable<PageableModel<VideoModel>> {
    return this.httpClient.get<PageableModel<VideoModel>>(this.URL, this.httpOptions);
  }

  getVideoById(id: number): Observable<VideoModel> {
    return this.httpClient.get<VideoModel>(`${this.URL}/${id}`, this.httpOptions);
  }

  createVideo(video: Omit<VideoModel, 'id'>): Observable<VideoModel> {
    return this.httpClient.post<VideoModel>(this.URL, video, this.httpOptions);
  }

  updateVideo(id: number, video: Partial<VideoModel>): Observable<VideoModel> {
    return this.httpClient.put<VideoModel>(`${this.URL}/${id}`, video, this.httpOptions);
  }

  deleteVideo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/${id}`, this.httpOptions);
  }

  searchVideos(search: string): Observable<PageableModel<VideoModel>> {
    return this.httpClient.get<PageableModel<VideoModel>>(`${this.URL}?search=${search}`, this.httpOptions);
  }
}
