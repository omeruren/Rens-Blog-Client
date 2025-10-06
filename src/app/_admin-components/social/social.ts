import { Component, OnInit } from '@angular/core';
import { SocialDto } from '../../_models/socialDto';
import { SocialService } from '../../_services/social-service';
import { SweetalertService } from '../../_services/sweetalert-service';
declare const alertify: any;
declare const bootstrap: any;
@Component({
  selector: 'app-social',
  standalone: false,
  templateUrl: './social.html',
  styleUrl: './social.css'
})
export class Social implements OnInit {
  /**
   *
   */
  constructor(private socialService: SocialService, private swal: SweetalertService) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  socials: SocialDto[];
  newSocial: SocialDto = new SocialDto();
  editSocial: any = {};
  errors: any = [];

  getAll() {
    this.socialService.getAll().subscribe({
      next: (result) => (this.socials = result.data),
      error: (result) => console.log(result),
    });
  }
  create() {
    this.socialService.create(this.newSocial).subscribe({
      next: (result) => {
        this.socials.push(result.data);
        alertify.success('Contact Info created successfully');
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
      },
    });
  }
  async delete(id) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.socialService.delete(id).subscribe({
        error: (result) => {
          console.log(result.error);
          alertify.error('An error occurred while deleting the Contact Info.');
        },
        complete: () => {
          alertify.success('Contact Info deleted successfully.');
          this.getAll();
        },
      });
    } else {
      console.log('Operation cancelled.');
    }
  }
  update() {
    this.socialService.update(this.editSocial).subscribe({
      error: (result) => {
        alertify.error('An error occurred while updating the Contact Info.');
        if (result.status === 400) {
          console.log(result.error);
          this.errors = result.error.errors;
        }
      },
      complete: () => {
        alertify.success('Contact Info updated successfully');

        // Close the  Modal
        const modal = document.getElementById('updateModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance?.hide();
      },
    });
  }

  onSelected(model: SocialDto) {
    this.editSocial = model;
  }
}
