import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedUserRouteGuardService {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.authenticationService.isUserLoggedIn())
      return true;

    this.router.navigate(['error']);

    return false;
  }
}
