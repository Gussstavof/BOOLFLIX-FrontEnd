import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title class="m-0">{{ data.title }}</h2>
    <div mat-dialog-content class="pt-2">
      <p class="m-0 text-muted">{{ data.message }}</p>
    </div>
    <div mat-dialog-actions align="end" class="pt-3">
      <button mat-button type="button" (click)="close(false)">{{ data.cancelText ?? 'Cancelar' }}</button>
      <button
        mat-raised-button
        type="button"
        [color]="data.danger ? 'warn' : 'primary'"
        (click)="close(true)"
      >
        {{ data.confirmText ?? 'Confirmar' }}
      </button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}

