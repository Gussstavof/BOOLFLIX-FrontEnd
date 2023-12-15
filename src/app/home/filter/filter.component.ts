import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../../models/category.model";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  selected = '';

  categories?: CategoryModel[];
  token = '';

  constructor(private service: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this.service.getAllCategories(this.token).subscribe(data => {
      this.categories = data.content
      this.categories.forEach(category => {
        console.log(category)
      })
    })
  }

}
