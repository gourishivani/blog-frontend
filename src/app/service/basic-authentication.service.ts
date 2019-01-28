import { Injectable } from '@angular/core';
import { User } from '../user/user-list/user-list.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASIC_AUTH } from '../app.constants';
import { AuthenticationBean } from '../models/authentication-bean';
import {map} from 'rxjs/operators'
import { ApiUtils } from '../models/api-utils';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private httpClient: HttpClient, private apiEndPoint: ApiUtils) { }

  executeAuthenticationService(username:string, password:string) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    
    // Note: Pipe only gets invoked when the get succedes.
    return this.httpClient.get<AuthenticationBean>(BASIC_AUTH, {headers}).pipe(
      map (
        data => {
          sessionStorage.setItem('authenticaterUser', username);
          sessionStorage.setItem('token', basicAuthHeaderString);
          return data;
        }
      )
    )
  }

 getAuthenticatedUser() {
    return sessionStorage.getItem('authenticaterUser')
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem('token')
  }

  getLoggedInUser() {
    let user = new User()
    user.id = 1
    return user;
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem('authenticaterUser')
    sessionStorage.removeItem('token')
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'user'
    let password = 'password'
    let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
    return basicAuthHeader;
  }
}
