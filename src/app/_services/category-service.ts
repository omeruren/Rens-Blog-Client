import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { CategoryDto } from '../_models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'https://localhost:7000/api/categories';
  /**
   *
   */
  constructor(private http: HttpClient) {}
  getCategories() {
    return this.http.get<Result<CategoryDto[]>>(this.baseUrl);
  }

  create(categoryDto:CategoryDto){
    return this.http.post<Result<CategoryDto>>(this.baseUrl,categoryDto);
  }
}
