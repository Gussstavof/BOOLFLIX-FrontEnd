import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoModel } from '../../../models/video.model';
import { VideoService } from '../../../services/video/video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  video?: VideoModel;
  safeEmbedUrl?: SafeResourceUrl;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isLoading = false;
      return;
    }

    this.videoService.getVideoById(id).subscribe({
      next: (video) => {
        this.video = video;
        this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.toYoutubeEmbedUrl(video.url));
        this.isLoading = false;
      },
      error: () => {
        this.video = undefined;
        this.isLoading = false;
      }
    });
  }

  back(): void {
    void this.router.navigateByUrl('/');
  }

  private toYoutubeEmbedUrl(url: string): string {
    const id = this.extractYoutubeId(url);
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
    return url;
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

