import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryModel } from '../../../models/category.model';
import { VideoModel } from '../../../models/video.model';
import { CategoryService } from '../../../services/category/category.service';
import { VideoService } from '../../../services/video/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos: VideoModel[] = [];

  constructor(
    private categoryService: CategoryService,
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.videoService.getVideos().subscribe((data) => {
      this.videos = this.sanitizeVideoUrls(data.content);
    });
  }

  onChangeCategory(category: CategoryModel): void {
    this.categoryService.getVideosByCategory(category.id).subscribe((data) => {
      this.videos = this.sanitizeVideoUrls(data.content);
    });
  }

  private sanitizeVideoUrls(videos: VideoModel[]): VideoModel[] {
    return videos.map((video) => ({
      ...video,
      urlSafe: this.sanitizer.bypassSecurityTrustResourceUrl(video.url)
    }));
  }
}
