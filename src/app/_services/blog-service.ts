import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogDto } from '../_models/blog';
import { Result } from '../_models/result';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseUrl = 'https://localhost:7000/api/blogs/';

  /**
   *
   */
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Result<BlogDto[]>>(this.baseUrl);
  }

  create(blogDto: BlogDto) {
    return this.http.post<Result<BlogDto>>(this.baseUrl, blogDto);
  }

  update(updateDto: BlogDto) {
    return this.http.put(this.baseUrl, updateDto);
  }
  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
