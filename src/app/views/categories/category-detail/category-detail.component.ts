import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../../../models/category.model';
import { VideoModel } from '../../../models/video.model';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category?: CategoryModel;
  videos: VideoModel[] = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.category = category;
        this.categoryService.getVideosByCategory(id).subscribe({
          next: (resp) => {
            this.videos = resp.content ?? [];
            this.isLoading = false;
          },
          error: () => {
            this.videos = [];
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.category = undefined;
        this.videos = [];
        this.isLoading = false;
      }
    });
  }
}

