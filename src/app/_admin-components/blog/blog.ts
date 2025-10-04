import { Observable } from 'rxjs';
import { BlogDto } from '../../_models/blog';
import { SweetalertService } from '../../_services/sweetalert-service';
import { BlogService } from './../../_services/blog-service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../_services/category-service';
import { CategoryDto } from '../../_models/category';
declare const alertify: any;
@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  blogs: BlogDto[];
  categories: CategoryDto[];
  newBlog: BlogDto = new BlogDto();
  errors: any = [];
  /**
   *
   */
  constructor(
    private blogService: BlogService,
    private swal: SweetalertService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getBlogs();
    this.getCategories();
  }

  getBlogs() {
    this.blogService.getAll().subscribe({
      next: (result) => (this.blogs = result.data),
      error: (result) => {
        console.log(result);
        alertify.error('An error Occured!');
      },
    });
  }

  createBlog() {
    this.errors = {};
    this.blogService.create(this.newBlog).subscribe({
      next: (result) => this.blogs.push(result.data),
      error: (result) => {
        console.log(result.error);
        alertify.error('An error Occured!');
        this.errors = result.error.errors;
      },
      complete: () => {
        alertify.success('Blog Created');
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (result) => (this.categories = result.data),
    });
  }
}
