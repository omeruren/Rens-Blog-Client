import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { SocialDto } from '../_models/socialDto';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
   baseUrl = 'https://localhost:7000/api/socials/';

    /**
     *
     */
    constructor(private http: HttpClient) {}

    getAll() {
      return this.http.get<Result<SocialDto[]>>(this.baseUrl);
    }

    getById(id: string) {
      return this.http.get<Result<SocialDto>>(this.baseUrl + id);
    }

    create(socialDto: SocialDto) {
      return this.http.post<Result<SocialDto>>(this.baseUrl, socialDto);
    }

    update(socialDto: SocialDto) {
      return this.http.put(this.baseUrl, socialDto);
    }
    delete(id: string) {
      return this.http.delete(this.baseUrl + id);
    }
}
