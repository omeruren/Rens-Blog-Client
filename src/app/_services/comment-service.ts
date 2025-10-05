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

  create(commentDto: CommentDto) {
    return this.http.post<Result<CommentDto>>(this.baseUrl, commentDto);
  }

  getAll() {
    return this.http.get<Result<CommentDto[]>>(this.baseUrl);
  }
}
