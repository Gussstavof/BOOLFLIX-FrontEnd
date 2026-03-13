import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() categories: CategoryModel[] = [];
  @Input() selectedCategoryId: string | null = null;
  @Output() categorySelected = new EventEmitter<string | null>();
  @Output() searchChanged = new EventEmitter<string>();

  searchControl = new FormControl('', { nonNullable: true });
  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((term) => this.searchChanged.emit(term));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  selectCategory(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }
}
