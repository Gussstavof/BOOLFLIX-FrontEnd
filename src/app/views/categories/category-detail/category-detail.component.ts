import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {
  category?: CategoryModel;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategoryById(id).subscribe((category) => (this.category = category));
  }
}
