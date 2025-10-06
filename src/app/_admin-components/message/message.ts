import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { MessageDto } from '../../_models/messageDto';

declare const alertify: any;
declare const bootstrap: any;

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message implements OnInit {
  /**
   *
   */
  constructor(private messageService: MessageService, private swal: SweetalertService) {}

  ngOnInit(): void {
    this.getAll();
    this.getSeen();
    this.getUnseen();
  }

  messages: MessageDto[];
  unseenMessages: MessageDto[];
  seenMessages: MessageDto[];
  newMessage: MessageDto = new MessageDto();
  editMessage: any = {};
  errors: any = [];

  getAll() {
    this.messageService.getAll().subscribe({
      next: (result) => (this.messages = result.data),
      error: (result) => console.log(result),
    });
  }
  getSeen() {
    this.messageService.getSeen().subscribe({
      next: (result) => (this.seenMessages = result.data),
      error: (result) => console.log(result),
    });
  }
  getUnseen() {
    this.messageService.getUnseen().subscribe({
      next: (result) => (this.unseenMessages = result.data),
      error: (result) => console.log(result),
    });
  }
  create() {
    this.messageService.create(this.newMessage).subscribe({
      next: (result) => {
        this.messages.push(result.data);
        alertify.success('Message created successfully');
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
      this.messageService.delete(id).subscribe({
        error: (result) => {
          console.log(result.error);
          alertify.error('An error occurred while deleting the Message.');
        },
        complete: () => {
          alertify.success('Message deleted successfully.');
          this.getAll();
        },
      });
    } else {
      console.log('Operation cancelled.');
    }
  }
  update() {
    this.messageService.update(this.editMessage).subscribe({
      error: (result) => {
        alertify.error('An error occurred while updating the Message.');
        if (result.status === 400) {
          console.log(result.error);
          this.errors = result.error.errors;
        }
      },
      complete: () => {
        alertify.success('Message updated successfully');

        // Close the  Modal
        const modal = document.getElementById('updateModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance?.hide();
      },
    });
  }

  onSelected(model: MessageDto) {
    this.editMessage = model;
    this.editMessage.isRead = true;
    this.messageService.update(this.editMessage).subscribe({
      error: (result) => console.log(result.error),
      complete: ()=>{
        this.getUnseen();
        this.getSeen();
      }
    });
  }
}
