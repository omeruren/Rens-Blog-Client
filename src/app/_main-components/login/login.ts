import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth-service';
import { loginDto } from '../../_models/loginDto';
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
  constructor(private autService: AuthService) {}

  login() {
    this.autService.login(this.loginDto).subscribe({
      next: (result) => {
        this.token = result.data.token;
        alertify.success('Login Successfull');
        localStorage.setItem('token', result.data.token);
        this.decodeToken()
        console.log(this.decodedToken)
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
