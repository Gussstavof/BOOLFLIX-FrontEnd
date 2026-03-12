import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { VideoModel } from '../../../models/video.model';
import { VideoService } from '../../../services/video/video.service';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.css']
})
export class AdminVideosComponent implements OnInit {
  videos: VideoModel[] = [];
  filteredVideos: VideoModel[] = [];
  searchControl = new FormControl('', { nonNullable: true });
  isLoading = true;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();

    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.applyFilter(term);
    });
  }

  loadVideos(): void {
    this.isLoading = true;
    this.videoService.getVideos().subscribe({
      next: (response) => {
        this.videos = response.content;
        this.filteredVideos = response.content;
        this.isLoading = false;
      },
      error: () => {
        this.videos = [];
        this.filteredVideos = [];
        this.isLoading = false;
      }
    });
  }

  private applyFilter(term: string): void {
    const normalized = term.trim().toLowerCase();

    if (!normalized) {
      this.filteredVideos = [...this.videos];
      return;
    }

    this.filteredVideos = this.videos.filter(
      (video) =>
        video.title.toLowerCase().includes(normalized) || video.description.toLowerCase().includes(normalized)
    );
  }
}
