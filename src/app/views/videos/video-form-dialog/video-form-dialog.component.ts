import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';
import { VideoModel } from '../../../models/video.model';
import { CategoryService } from '../../../services/category/category.service';
import { VideoService } from '../../../services/video/video.service';

export interface VideoFormDialogData {
  mode: 'create' | 'edit';
  video?: VideoModel;
}

export type VideoFormDialogResult = VideoModel | null;

@Component({
  selector: 'app-video-form-dialog',
  template: `
    <h2 mat-dialog-title class="m-0">
      {{ data.mode === 'create' ? 'Novo video' : 'Editar video' }}
    </h2>

    <div mat-dialog-content class="pt-3">
      <form [formGroup]="form" class="d-flex flex-column gap-3">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Titulo</mat-label>
          <input matInput formControlName="title" placeholder="Ex: Introducao ao Angular" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Descricao</mat-label>
          <textarea
            matInput
            rows="4"
            formControlName="description"
            placeholder="Breve descricao para o catalogo"
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Categoria</mat-label>
          <mat-select formControlName="categoryId">
            <mat-option *ngFor="let category of categories" [value]="category.id">
              {{ category.title }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>URL do YouTube</mat-label>
          <input matInput formControlName="url" placeholder="https://www.youtube.com/watch?v=..." />
        </mat-form-field>
      </form>

      <div *ngIf="isLoadingCategories" class="text-muted small pt-1">Carregando categorias...</div>
    </div>

    <div mat-dialog-actions align="end" class="pt-3">
      <button mat-button type="button" (click)="close()">Cancelar</button>
      <button
        mat-raised-button
        color="primary"
        type="button"
        [disabled]="form.invalid || isSubmitting"
        (click)="submit()"
      >
        {{ isSubmitting ? 'Salvando...' : 'Salvar' }}
      </button>
    </div>
  `
})
export class VideoFormDialogComponent implements OnInit {
  categories: CategoryModel[] = [];
  isLoadingCategories = true;
  isSubmitting = false;

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(120)] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
    url: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
    categoryId: new FormControl<number | null>(null, { validators: [Validators.required] })
  });

  constructor(
    private dialogRef: MatDialogRef<VideoFormDialogComponent, VideoFormDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: VideoFormDialogData,
    private videoService: VideoService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    if (this.data.video) {
      this.form.patchValue({
        title: this.data.video.title ?? '',
        description: this.data.video.description ?? '',
        url: this.data.video.url ?? '',
        categoryId: this.data.video.categoryId ?? null
      });
    }

    this.categoryService
      .getCategories()
      .pipe(finalize(() => (this.isLoadingCategories = false)))
      .subscribe({
        next: (resp) => {
          this.categories = resp.content ?? [];
          if (!this.form.value.categoryId && this.categories.length > 0) {
            this.form.patchValue({ categoryId: this.categories[0].id });
          }
        },
        error: () => {
          this.categories = [];
        }
      });
  }

  close(): void {
    this.dialogRef.close(null);
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting) return;

    const value = this.form.getRawValue();
    this.isSubmitting = true;

    const request$ =
      this.data.mode === 'create'
        ? this.videoService.createVideo({
            title: value.title,
            description: value.description,
            url: value.url,
            categoryId: value.categoryId!
          })
        : this.videoService.updateVideo(this.data.video!.id, {
            title: value.title,
            description: value.description,
            url: value.url,
            categoryId: value.categoryId!
          });

    request$.pipe(finalize(() => (this.isSubmitting = false))).subscribe({
      next: (saved) => this.dialogRef.close(saved),
      error: () => this.dialogRef.close(null)
    });
  }
}

