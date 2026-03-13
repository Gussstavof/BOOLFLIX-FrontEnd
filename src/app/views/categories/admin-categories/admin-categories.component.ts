import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { CategoryFormDialogComponent } from '../category-form-dialog/category-form-dialog.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: CategoryModel[] = [];
  filteredCategories: CategoryModel[] = [];
  searchControl = new FormControl('', { nonNullable: true });
  isLoading = true;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.searchControl.valueChanges.pipe(debounceTime(250), distinctUntilChanged()).subscribe((term) => {
      this.applyFilter(term);
    });
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.content ?? [];
        this.applyFilter(this.searchControl.value);
        this.isLoading = false;
      },
      error: () => {
        this.categories = [];
        this.filteredCategories = [];
        this.isLoading = false;
      }
    });
  }

  openCreate(): void {
    const ref = this.dialog.open(CategoryFormDialogComponent, {
      width: '640px',
      data: { mode: 'create' }
    });

    ref.afterClosed().subscribe((created) => {
      if (!created) return;
      this.categories = [created, ...this.categories];
      this.applyFilter(this.searchControl.value);
      this.snackBar.open('Categoria criada.', 'OK', { duration: 2500 });
    });
  }

  openEdit(category: CategoryModel): void {
    const ref = this.dialog.open(CategoryFormDialogComponent, {
      width: '640px',
      data: { mode: 'edit', category }
    });

    ref.afterClosed().subscribe((updated) => {
      if (!updated) return;
      this.categories = this.categories.map((c) => (c.id === updated.id ? updated : c));
      this.applyFilter(this.searchControl.value);
      this.snackBar.open('Categoria atualizada.', 'OK', { duration: 2500 });
    });
  }

  confirmDelete(category: CategoryModel): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '520px',
      data: {
        title: 'Excluir categoria?',
        message: `Voce tem certeza que deseja excluir "${category.title}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
        danger: true
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.categoryService.deleteCategory(category.id).subscribe({
        next: () => {
          this.categories = this.categories.filter((c) => c.id !== category.id);
          this.applyFilter(this.searchControl.value);
          this.snackBar.open('Categoria excluida.', 'OK', { duration: 2500 });
        }
      });
    });
  }

  badgeStyle(category: CategoryModel): Record<string, string> {
    const color = category.color;
    return {
      color,
      border: `1px solid ${color}`,
      backgroundColor: `${color}1F`
    };
  }

  private applyFilter(term: string): void {
    const normalized = term.trim().toLowerCase();
    if (!normalized) {
      this.filteredCategories = [...this.categories];
      return;
    }

    this.filteredCategories = this.categories.filter((category) => category.title.toLowerCase().includes(normalized));
  }
}

