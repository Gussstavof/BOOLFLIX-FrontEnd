import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { VideoModel } from '../../../models/video.model';
import { VideoService } from '../../../services/video/video.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { VideoFormDialogComponent } from '../video-form-dialog/video-form-dialog.component';

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

  constructor(
    private videoService: VideoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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

  openCreate(): void {
    const ref = this.dialog.open(VideoFormDialogComponent, {
      width: '680px',
      data: { mode: 'create' }
    });

    ref.afterClosed().subscribe((created) => {
      if (!created) return;
      this.videos = [created, ...this.videos];
      this.applyFilter(this.searchControl.value);
      this.snackBar.open('Video criado.', 'OK', { duration: 2500 });
    });
  }

  openEdit(video: VideoModel): void {
    const ref = this.dialog.open(VideoFormDialogComponent, {
      width: '680px',
      data: { mode: 'edit', video }
    });

    ref.afterClosed().subscribe((updated) => {
      if (!updated) return;
      this.videos = this.videos.map((v) => (v.id === updated.id ? updated : v));
      this.applyFilter(this.searchControl.value);
      this.snackBar.open('Video atualizado.', 'OK', { duration: 2500 });
    });
  }

  confirmDelete(video: VideoModel): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '520px',
      data: {
        title: 'Excluir video?',
        message: `Voce tem certeza que deseja excluir "${video.title}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        danger: true
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.videoService.deleteVideo(video.id).subscribe({
        next: () => {
          this.videos = this.videos.filter((v) => v.id !== video.id);
          this.applyFilter(this.searchControl.value);
          this.snackBar.open('Video excluido.', 'OK', { duration: 2500 });
        }
      });
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
