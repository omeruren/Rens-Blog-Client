import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from '../../_services/contact-info-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { ContactInfoDto } from '../../_models/contactInfoDto';
declare const alertify: any;
declare const bootstrap: any;

@Component({
  selector: 'app-contact-info',
  standalone: false,
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.css',
})
export class ContactInfo implements OnInit {
  /**
   *
   */
  constructor(private contactInfoService: ContactInfoService, private swal: SweetalertService) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  contactInfos: ContactInfoDto[];
  newContactInfo: ContactInfoDto = new ContactInfoDto();
  editContactInfo: any = {};
  errors: any = [];

  getAll() {
    this.contactInfoService.getAll().subscribe({
      next: (result) => (this.contactInfos = result.data),
      error: (result) => console.log(result),
    });
  }
  create() {
    this.contactInfoService.create(this.newContactInfo).subscribe({
      next: (result) => {
        this.contactInfos.push(result.data);
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
      this.contactInfoService.delete(id).subscribe({
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
    this.contactInfoService.update(this.editContactInfo).subscribe({
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

  onSelected(model: ContactInfoDto) {
    this.editContactInfo = model;
  }
}
