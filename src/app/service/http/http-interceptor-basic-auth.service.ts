import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let headers = window.sessionStorage.getItem('token')
    let username = this.basicAuthenticationService.getAuthenticatedUser()
    let headers = this.basicAuthenticationService.getAuthenticatedToken()

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
