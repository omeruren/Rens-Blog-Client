import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDto } from '../_models/commentDto';
import { Result } from '../_models/result';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl = 'https://localhost:7000/api/comments/';
  /**
   *
   */
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Result<CommentDto[]>>(this.baseUrl);
  }
  create(commentDto: CommentDto) {
    return this.http.post<Result<CommentDto>>(this.baseUrl, commentDto);
  }
  update(commentDto: CommentDto) {
    return this.http.put(this.baseUrl, commentDto);
  }
  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
  getById(id: string) {
    return this.http.get<Result<CommentDto>>(this.baseUrl + id);
  }
}
