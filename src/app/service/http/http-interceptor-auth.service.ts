import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorAuthService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let headers = window.sessionStorage.getItem('token')
    let username = this.authenticationService.getAuthenticatedUser()
    let headers = this.authenticationService.getAuthenticatedToken()

    if (headers && username) {
      //request is immutable. We need to clone and add header and pass that on
      request = request.clone({
        setHeaders: {
          Authorization: headers
        }
      })
    }
    
    return next.handle(request)
  }
}
