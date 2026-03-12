import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryService} from '../../../services/category/category.service';
import {CategoryModel} from '../../../models/category.model';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<CategoryModel | null>();
  @Output() searchChanged = new EventEmitter<string>();

  category: CategoryModel | null = null;
  categories?: CategoryModel[];
  searchControl = new FormControl('');

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => this.searchChanged.emit((value || '').trim()));
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data.content;
    });
  }

  sendCategory(category: CategoryModel | null) {
    this.categorySelected.emit(category);
  }
}
