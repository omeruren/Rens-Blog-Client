import { Component } from '@angular/core';
import { BlogService } from '../../_services/blog-service';
import { ActivatedRoute } from '@angular/router';
import { BlogDto } from '../../_models/blog';

@Component({
  selector: 'app-blog-details',
  standalone: false,
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails {
  blog: BlogDto;

  /**
   *
   */
  constructor(private blogService: BlogService, private route: ActivatedRoute) {
    this.getById();
  }

  getById() {
    this.blogService.getById(this.route.snapshot.params['id']).subscribe({
      next: (result) => {
        this.blog = result.data;
      },
    });
  }
}
