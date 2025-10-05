import { Observable } from 'rxjs';
import { BlogDto } from '../../_models/blog';
import { SweetalertService } from '../../_services/sweetalert-service';
import { BlogService } from './../../_services/blog-service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../_services/category-service';
import { CategoryDto } from '../../_models/category';
import { AuthService } from '../../_services/auth-service';
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
  editBlog: any = {};
  newBlog: BlogDto = new BlogDto();
  errors: any = {};
  /**
   *
   */
  constructor(
    private blogService: BlogService,
    private swal: SweetalertService,
    private categoryService: CategoryService,
    private authService: AuthService
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
    let decodedToken = this.authService.decodeToken();
    this.newBlog.userId = decodedToken.sub;

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
        this.errors = {};
      },
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (result) => (this.categories = result.data),
    });
  }

  onSelected(blog) {
    this.errors = {};
    this.editBlog = blog;
  }

  update() {
    this.errors = {};
    let decodedToken = this.authService.decodeToken();
    this.editBlog.userId = decodedToken.sub;

    this.blogService.update(this.editBlog).subscribe({
      error: (result) => {
        console.log(result.error);
        alertify.error('An error Occured!');
        this.errors = result.error.errors;
      },
      complete: () => {
        alertify.success('Blog updated');
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.errors = {};
      },
    });
  }

  async delete(id) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.blogService.delete(id).subscribe({
        error: (result) => {
          console.log(result.error);
          alertify.error('An error occurred while deleting the Blog.');
        },
        complete: () => {
          alertify.success('Blog deleted successfully.');
          this.getBlogs();
        },
      });
    } else {
      console.log('Operation cancelled.');
    }
  }
}
