import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../_services/auth-service';
declare const alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isLoggedIn()) return true;

    alertify.error("Permission Denied. Please Login First")

    this.router.navigate([""]);
    return false;
  }
}
