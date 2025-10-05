import { Component } from '@angular/core';
import { CommentService } from '../../_services/comment-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { CommentDto } from '../../_models/commentDto';
declare const alertify: any;
declare const bootstrap: any;
@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class Comment {
  comments: CommentDto[];
  newComment: CommentDto = new CommentDto();
  editComment: any = {};
  errors: any = [];
  /**
   *
   */
  constructor(private commentService: CommentService, private swal: SweetalertService) {
    this.getComments();
  }

  getComments() {
    this.commentService.getAll().subscribe({
      next: (result) => (this.comments = result.data),
      error: (result) => console.log(result),
    });
  }

  async delete(id) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.commentService.delete(id).subscribe({
        error: (result) => {
          console.log(result.error);
          alertify.error('An error occurred while deleting the Comment.');
        },
        complete: () => {
          alertify.success('Comment deleted successfully.');
          this.getComments();
        },
      });
    } else {
      console.log('Operation cancelled.');
    }
  }
}
