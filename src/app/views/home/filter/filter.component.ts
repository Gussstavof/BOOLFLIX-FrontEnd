import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() categorySelected: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>();

  category?: CategoryModel;
  categories?: CategoryModel[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.content;
    });
  }

  sendCategory(category: CategoryModel): void {
    this.categorySelected.emit(category);
  }
}
