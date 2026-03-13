import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../../../models/category.model';
import { VideoModel } from '../../../models/video.model';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category?: CategoryModel;
  videos: VideoModel[] = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.category = category;
        this.loadVideos(id);
      },
      error: () => {
        this.category = undefined;
        this.videos = [];
        this.isLoading = false;
      }
    });
  }

  get badgeStyle(): Record<string, string> {
    if (!this.category?.color) return {};
    const color = this.category.color;
    return {
      color,
      border: `1px solid ${color}`,
      backgroundColor: `${color}1F`
    };
  }

  getThumbnailUrl(video: VideoModel): string {
    return video.thumbnailUrl || this.youtubeThumbnailFromUrl(video.url) || '';
  }

  private loadVideos(categoryId: number): void {
    this.categoryService.getVideosByCategory(categoryId).subscribe({
      next: (response) => {
        this.videos = response.content ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.videos = [];
        this.isLoading = false;
      }
    });
  }

  private youtubeThumbnailFromUrl(url: string): string | null {
    const id = this.extractYoutubeId(url);
    if (!id) return null;
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  private extractYoutubeId(url: string): string | null {
    if (!url) return null;

    const trimmed = url.trim();
    const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch?.[1]) return embedMatch[1];

    const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch?.[1]) return shortMatch[1];

    const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch?.[1]) return watchMatch[1];

    return null;
  }
}
