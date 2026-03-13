import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryModel } from '../../../models/category.model';
import { VideoModel } from '../../../models/video.model';
import { AuthService } from '../../../services/auth/auth.service';
import { CategoryService } from '../../../services/category/category.service';
import { VideoService } from '../../../services/video/video.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { VideoFormDialogComponent } from '../video-form-dialog/video-form-dialog.component';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html'
})
export class VideoDetailComponent implements OnInit {
  video?: VideoModel;
  safeEmbedUrl?: SafeResourceUrl;
  category?: CategoryModel;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private categoryService: CategoryService,
    public authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.videoService.getVideoById(id).subscribe({
      next: (video) => {
        this.video = video;
        this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.toYoutubeEmbedUrl(video.url));
        this.loadCategory(video.categoryId);
        this.isLoading = false;
      },
      error: () => {
        this.video = undefined;
        this.isLoading = false;
      }
    });
  }

  get categoryBadgeStyle(): Record<string, string> {
    if (!this.category?.color) return {};
    const color = this.category.color;
    return {
      color,
      border: `1px solid ${color}`,
      backgroundColor: `${color}1F`
    };
  }

  openEdit(): void {
    if (!this.video) return;

    const ref = this.dialog.open(VideoFormDialogComponent, {
      width: '680px',
      data: { mode: 'edit', video: this.video }
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.video = result;
      this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.toYoutubeEmbedUrl(result.url));
      this.loadCategory(result.categoryId);
      this.snackBar.open('Video atualizado.', 'OK', { duration: 2500 });
    });
  }

  confirmDelete(): void {
    if (!this.video) return;

    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '520px',
      data: {
        title: 'Excluir video?',
        message: 'Esta acao nao pode ser desfeita.',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        danger: true
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (!confirmed || !this.video) return;
      this.videoService.deleteVideo(this.video.id).subscribe({
        next: async () => {
          this.snackBar.open('Video excluido.', 'OK', { duration: 2500 });
          await this.router.navigateByUrl('/home');
        }
      });
    });
  }

  private loadCategory(categoryId: number): void {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (category) => (this.category = category),
      error: () => (this.category = undefined)
    });
  }

  private toYoutubeEmbedUrl(url: string): string {
    const id = this.extractYoutubeId(url);
    if (id) return `https://www.youtube.com/embed/${id}`;
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
