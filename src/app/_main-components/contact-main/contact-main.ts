import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from '../../_services/contact-info-service';
import { ContactInfoDto } from '../../_models/contactInfoDto';

@Component({
  selector: 'app-contact-main',
  standalone: false,
  templateUrl: './contact-main.html',
  styleUrl: './contact-main.css',
})
export class ContactMain implements OnInit{
  /**
   *
   */

  contactInfos: ContactInfoDto[];
  constructor(private contactInfoService: ContactInfoService) {}


  ngOnInit(): void {
    this.getall();
  }

  getall() {
    this.contactInfoService.getAll().subscribe({
      next: (result) => {
        this.contactInfos = result.data;
      },
      error: (result) => console.log(result.error),
    });
  }
}
