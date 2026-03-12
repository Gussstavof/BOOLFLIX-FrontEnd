import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../../../models/category.model';
import {VideoModel} from '../../../models/video.model';
import {DomSanitizer} from '@angular/platform-browser';
import {VideoService} from '../../../services/video/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos: VideoModel[] = [];
  selectedCategoryId?: string;
  searchTerm = '';

  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.loadVideos();
  }

  onChangeCategory(category: CategoryModel | null) {
    this.selectedCategoryId = category?.id;
    this.loadVideos();
  }

  onSearchChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.loadVideos();
  }

  private loadVideos(): void {
    this.videoService.getVideos(this.selectedCategoryId, this.searchTerm)
      .subscribe(videos => {
        this.videos = videos.map(video => ({
          ...video,
          urlSafe: this.sanitizer.bypassSecurityTrustResourceUrl(video.url)
        }));
      });
  }
}
