import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryModel} from "../../../models/category.model";
import {CategoryService} from "../../../services/category/category.service";
import {BehaviorSubject} from "rxjs";
import {PageableModel} from "../../../models/pageable.model";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  @Output() categorySelected: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>;

  category: CategoryModel | undefined
  categories?: CategoryModel[];

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data.content;
      this.categories.forEach(category => console.log(category));
    });
  }
  sendCategory(category: CategoryModel) {
    this.categorySelected.emit(category);
  }
}
