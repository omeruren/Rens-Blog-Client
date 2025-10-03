import { Component } from '@angular/core';
import { CategoryService } from '../../_services/category-service';
import { CategoryDto } from '../../_models/category';
declare const alertify: any;

@Component({
  selector: 'admin-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  /**
   *
   */
  constructor(private categoryService: CategoryService) {
    this.getCategories();
  }

  categories: CategoryDto[];
  newCategory: CategoryDto = new CategoryDto();

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (result) => (this.categories = result.data),
      error: (result) => console.log(result),
    });
  }
  createCategory() {
    this.categoryService.create(this.newCategory).subscribe({
      next: (result) => this.categories.push(result.data),
      error: (result) => alertify.error(result.error.errors[0].errorMessage),
      complete: () => alertify.success('Category created successfully'),
    });
  }
}
