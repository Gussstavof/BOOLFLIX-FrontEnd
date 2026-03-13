import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';

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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.load();
    this.searchControl.valueChanges.pipe(debounceTime(200), distinctUntilChanged()).subscribe((term) => {
      this.applyFilter(term);
    });
  }

  load(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (resp) => {
        this.categories = resp.content ?? [];
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

  private applyFilter(term: string): void {
    const normalized = term.trim().toLowerCase();
    if (!normalized) {
      this.filteredCategories = [...this.categories];
      return;
    }
    this.filteredCategories = this.categories.filter((c) => (c.title ?? '').toLowerCase().includes(normalized));
  }
}

