import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth-service';
import { loginDto } from '../../_models/loginDto';
import { Router } from '@angular/router';
declare const alertify: any;
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  token: any;
  loginDto: loginDto = new loginDto();
  errors: any = {};
  decodedToken:any;
  /**
   *
   */
  constructor(private autService: AuthService, private router:Router) {}

  login() {
    this.autService.login(this.loginDto).subscribe({
      next: (result) => {
        this.token = result.data.token;
        alertify.success('Login Successfull');
        this.router.navigate(["/admin"])
        localStorage.setItem('token', result.data.token);
      },
      error: (result) => {
        console.log(result.error.errors);
        alertify.error('login failed');
      },
    });
  }

  decodeToken() {
  this.decodedToken = this.autService.decodeToken();

  }
}
