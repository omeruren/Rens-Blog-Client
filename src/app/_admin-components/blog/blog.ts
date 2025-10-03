import { Observable } from 'rxjs';
import { BlogDto } from '../../_models/blog';
import { SweetalertService } from '../../_services/sweetalert-service';
import { BlogService } from './../../_services/blog-service';
import { Component, OnInit } from '@angular/core';
declare const alertify: any;
@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  blogs: BlogDto[];
  /**
   *
   */
  constructor(private blogService: BlogService, private swal: SweetalertService) {}
  ngOnInit(): void {
    this.getBlogs();
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
}
