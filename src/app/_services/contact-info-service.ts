import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactInfoDto } from '../_models/contactInfoDto';
import { Result } from '../_models/result';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {
  baseUrl = 'https://localhost:7000/api/contactInfos/';

  /**
   *
   */
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Result<ContactInfoDto[]>>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<Result<ContactInfoDto>>(this.baseUrl + id);
  }

  create(contactInfoDto: ContactInfoDto) {
    return this.http.post<Result<ContactInfoDto>>(this.baseUrl, contactInfoDto);
  }

  update(contactInfoDto: ContactInfoDto) {
    return this.http.put(this.baseUrl, contactInfoDto);
  }
  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
