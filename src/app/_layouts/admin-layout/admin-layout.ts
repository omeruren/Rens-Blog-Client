import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth-service';
declare const alertify:any;
@Component({
  selector: 'admin-layout',
  standalone: false,
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {


  /**
   *
   */
  constructor(private authService:AuthService) {

  }

  getUserInfo(){
    let token= this.authService.decodeToken();
    return token.name;
  }

  logout(){
    this.authService.logout();
    alertify.success("Logged Out")
  }
}
