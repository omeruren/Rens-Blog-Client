import { Component } from '@angular/core';
import { CategoryService } from '../../_services/category-service';
import { CategoryDto } from '../../_models/category';

@Component({
  selector: 'admin-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {
/**
 *
 */
constructor(private categoryService:CategoryService) {
this.getCategories();
}

categories: CategoryDto[];

getCategories(){
  this.categoryService.getCategories().subscribe(
    {
      next: result => this.categories = result.data,
      error: result => console.log(result)
    }
  )
}
}
