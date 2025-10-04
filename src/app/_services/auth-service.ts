import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { loginDto } from '../_models/loginDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router:Router) {}

  login(model: loginDto) {
    return this.http.post<any>(this.baseUrl, model);
  }

  logout() {
localStorage.removeItem("token");
this.router.navigate([""]);

  }
  decodeToken() {
    let token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    return this.decodedToken;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
