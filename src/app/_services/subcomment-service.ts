import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { SubCommentDto } from '../_models/subcommentDto';

@Injectable({
  providedIn: 'root'
})
export class SubCommentService {
  baseUrl = 'https://localhost:7000/api/subComments/';

    /**
     *
     */
    constructor(private http: HttpClient) {}

    getAll() {
      return this.http.get<Result<SubCommentDto[]>>(this.baseUrl);
    }

    getById(id: string) {
      return this.http.get<Result<SubCommentDto>>(this.baseUrl + id);
    }

    create(subCommentDto: SubCommentDto) {
      return this.http.post<Result<SubCommentDto>>(this.baseUrl, subCommentDto);
    }

    update(subCommentDto: SubCommentDto) {
      return this.http.put(this.baseUrl, subCommentDto);
    }
    delete(id: string) {
      return this.http.delete(this.baseUrl + id);
    }
}
