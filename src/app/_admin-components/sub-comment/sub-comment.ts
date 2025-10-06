import { Component, OnInit } from '@angular/core';
import { SubCommentService } from '../../_services/subcomment-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { SubCommentDto } from '../../_models/subcommentDto';
declare const alertify: any;
declare const bootstrap: any;
@Component({
  selector: 'app-sub-comment',
  standalone: false,
  templateUrl: './sub-comment.html',
  styleUrl: './sub-comment.css'
})
export class SubComment implements OnInit {
  /**
   *
   */
  constructor(private subCommentService: SubCommentService, private swal: SweetalertService) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  subComments: SubCommentDto[];
  newSubComment: SubCommentDto = new SubCommentDto();
  editSubComment: any = {};
  errors: any = [];

  getAll() {
    this.subCommentService.getAll().subscribe({
      next: (result) => (this.subComments = result.data),
      error: (result) => console.log(result),
    });
  }
  create() {
    this.subCommentService.create(this.newSubComment).subscribe({
      next: (result) => {
        this.subComments.push(result.data);
        alertify.success('Sub Comment created successfully');
        // Close the  Modal
        const modal = document.getElementById('createModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance?.hide();
      },
      error: (result) => {
        alertify.error('An error occurred while creating the Sub Comment.');
        if (result.status === 400) {
          this.errors = result.error.errors;
        }
      },
    });
  }
  async delete(id) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.subCommentService.delete(id).subscribe({
        error: (result) => {
          console.log(result.error);
          alertify.error('An error occurred while deleting the Sub Comment.');
        },
        complete: () => {
          alertify.success('Sub Comment deleted successfully.');
          this.getAll();
        },
      });
    } else {
      console.log('Operation cancelled.');
    }
  }
  update() {
    this.subCommentService.update(this.editSubComment).subscribe({
      error: (result) => {
        alertify.error('An error occurred while updating the Sub Comment.');
        if (result.status === 400) {
          console.log(result.error);
          this.errors = result.error.errors;
        }
      },
      complete: () => {
        alertify.success('Sub Comment updated successfully');

        // Close the  Modal
        const modal = document.getElementById('updateModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance?.hide();
      },
    });
  }

  onSelected(model: SubCommentDto) {
    this.editSubComment = model;
  }
}

