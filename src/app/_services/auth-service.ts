import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { loginDto } from '../_models/loginDto';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://localhost:7000/api/users/login';
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  /**
   *
   */
  constructor(private http: HttpClient) {}

  login(model: loginDto) {
    return this.http.post<any>(this.baseUrl, model);
  }

  decodeToken() {
    let token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    return this.decodedToken;
  }

  isLoggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
