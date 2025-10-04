import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { loginDto } from '../_models/loginDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://localhost:7000/api/users/login';

  /**
   *
   */
  constructor(private http: HttpClient) {}

  login(model: loginDto) {
    return this.http.post<any>(this.baseUrl, model);
  }
}
