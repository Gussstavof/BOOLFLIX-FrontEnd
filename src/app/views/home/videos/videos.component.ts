import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  categories: CategoryModel[] = [];
  private categoryById = new Map<string, CategoryModel>();

  videos: VideoModel[] = [];
  filteredVideos: VideoModel[] = [];
  selectedCategoryId: string | null = null;
  searchTerm = '';
  isLoading = true;

  constructor(
    private categoryService: CategoryService,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;

    forkJoin({
      categories: this.categoryService.getCategories(),
      videos: this.videoService.getVideos()
    }).subscribe({
      next: ({ categories, videos }) => {
        this.categories = categories.content ?? [];
        this.categoryById = new Map(this.categories.map((c) => [c.id, c]));
        this.videos = videos.content ?? [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.categories = [];
        this.categoryById = new Map();
        this.videos = [];
        this.filteredVideos = [];
        this.isLoading = false;
      }
    });
  }

  onCategorySelected(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }

  onSearchChanged(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  getCategoryLabel(categoryId: string): string {
    return this.categoryById.get(categoryId)?.title ?? 'Categoria';
  }

  getCategoryBadgeStyle(categoryId: string): Record<string, string> {
    const color = this.categoryById.get(categoryId)?.color;
    if (!color) return {};
    return {
      color,
      border: `1px solid ${color}`,
      backgroundColor: `${color}1F`
    };
  }

  getThumbnailUrl(video: VideoModel): string {
    return video.thumbnailUrl || this.youtubeThumbnailFromUrl(video.url) || '';
  }

  private applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredVideos = this.videos.filter((video) => {
      const matchesCategory = this.selectedCategoryId === null || video.category?.id === this.selectedCategoryId;
      if (!matchesCategory) return false;

      if (!term) return true;

      const title = video.title?.toLowerCase() ?? '';
      const description = video.description?.toLowerCase() ?? '';
      const category = (video.category?.title ?? this.getCategoryLabel(video.category?.id ?? '')).toLowerCase();
      return title.includes(term) || description.includes(term) || category.includes(term);
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

