import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';

export interface CategoryFormDialogData {
  mode: 'create' | 'edit';
  category?: CategoryModel;
}

export type CategoryFormDialogResult = CategoryModel | null;

@Component({
  selector: 'app-category-form-dialog',
  template: `
    <h2 mat-dialog-title class="m-0">
      {{ data.mode === 'create' ? 'Nova categoria' : 'Editar categoria' }}
    </h2>

    <div mat-dialog-content class="pt-3">
      <form [formGroup]="form" class="d-flex flex-column gap-3">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Titulo</mat-label>
          <input matInput formControlName="title" placeholder="Ex: Front-End" />
        </mat-form-field>

        <div class="d-flex flex-column gap-2">
          <label class="form-label m-0">Cor do badge</label>
          <div class="d-flex flex-column flex-md-row gap-2 align-items-md-center">
            <input type="color" class="form-control form-control-color" [value]="colorValue" (input)="onColorInput($event)" />
            <input
              type="text"
              class="form-control"
              formControlName="color"
              placeholder="#22C55E"
              spellcheck="false"
            />
            <span class="badge rounded-pill px-3 py-2" [ngStyle]="previewStyle">Preview</span>
          </div>
          <div *ngIf="form.controls.color.invalid && form.controls.color.touched" class="text-danger small">
            Use um HEX valido (ex: #22C55E).
          </div>
        </div>
      </form>
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
export class CategoryFormDialogComponent implements OnInit {
  isSubmitting = false;

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(60)] }),
    color: new FormControl('#22C55E', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^#([0-9a-fA-F]{6})$/)]
    })
  });

  constructor(
    private dialogRef: MatDialogRef<CategoryFormDialogComponent, CategoryFormDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryFormDialogData,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    if (this.data.category) {
      this.form.patchValue({
        title: this.data.category.title ?? '',
        color: this.data.category.color ?? '#22C55E'
      });
    }
  }

  get colorValue(): string {
    return this.form.value.color || '#22C55E';
  }

  get previewStyle(): Record<string, string> {
    const color = this.form.value.color || '#22C55E';
    return {
      color,
      border: `1px solid ${color}`,
      backgroundColor: `${color}1F`
    };
  }

  onColorInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value) {
      this.form.patchValue({ color: value.toUpperCase() });
      this.form.controls.color.markAsTouched();
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;

    const value = this.form.getRawValue();
    const request$ =
      this.data.mode === 'create'
        ? this.categoryService.createCategory({ title: value.title, color: value.color })
        : this.categoryService.updateCategory(this.data.category!.id, { title: value.title, color: value.color });

    request$.pipe(finalize(() => (this.isSubmitting = false))).subscribe({
      next: (saved) => this.dialogRef.close(saved),
      error: () => this.dialogRef.close(null)
    });
  }
}

