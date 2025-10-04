import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth-service';

@Component({
  selector: 'main-layout',
  standalone: false,
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {


  /**
   *
   */
  constructor(private authService:AuthService) {

  }

  getUserInfo(){
    let decodedToken = this.authService.decodeToken();
    return decodedToken.fullName;
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
