import { Injectable } from '@angular/core';
import { SimpleAuthenticationService } from './simple-authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedUserRouteGuardService {

  constructor(
    private simpleAuthenticationService: SimpleAuthenticationService,
    private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.simpleAuthenticationService.isUserLoggedIn())
      return true;

    this.router.navigate(['error']);

    return false;
  }
}
