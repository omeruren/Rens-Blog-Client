import { Component } from '@angular/core';
import { CategoryService } from '../../_services/category-service';
import { CategoryDto } from '../../_models/category';
declare const alertify: any;
declare const bootstrap: any;

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
  errors: any = [];
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (result) => (this.categories = result.data),
      error: (result) => console.log(result),
    });
  }
  createCategory() {
  this.categoryService.create(this.newCategory).subscribe({
    next: (result) => {
      this.categories.push(result.data);
      alertify.success('Category created successfully');
      // Close the  Modal
      const modal = document.getElementById('createModal');
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    },
    error: (result) => {
      alertify.error('An error occurred while creating the category.');
      if (result.status === 400) {
        this.errors = result.error.errors;
      }
    }
  });
}
  delete(id){
    this.categoryService.delete(id).subscribe({
      error :result=> {
        console.log(result.error);
        alertify.error("An error occurred while deleting the category.")
      },
      complete:()=>{
        alertify.success("Category deleted successfully.");
        this.getCategories();
      }
    });
  }
}
