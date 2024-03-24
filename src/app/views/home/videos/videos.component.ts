import {Component, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CategoryModel} from "../../../models/category.model";
import {VideoService} from "../../../services/video/video.service";
import {PageableModel} from "../../../models/pageable.model";
import {CategoryService} from "../../../services/category/category.service";
import {VideoModel} from "../../../models/video.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
  videos: VideoModel[] | undefined;

  constructor(private categoryService: CategoryService,
              private sanitizer: DomSanitizer
  ) {}

  onChangeCategory(category: CategoryModel) {
     this.showVideosByCategory(category)
  }

  showVideosByCategory(category: CategoryModel) {
    this.categoryService.getVideosByCategory(category.id)
      .subscribe(data => {
        this.videos = data.content;
        this.videos.forEach(video =>{
          video.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
        });
    });
  }
}
