import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASIC_AUTH, BASE } from '../app.constants';
import { AuthenticationBean } from '../models/authentication-bean';
import {map} from 'rxjs/operators'
import { ApiUtils } from '../models/api-utils';
import { AuthenticatedUser } from '../models/authenticated-user';
import { UserDetail } from '../models/user-detail';


export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'
export const AUTHENTICATED_USER_EMAIL = 'authenticaterUserEmail'
export const AUTHENTICATED_USER_SPACENAME = 'authenticaterUserSpaceName'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private apiEndPoint: ApiUtils) { }

  executeJWTAuthenticationService(username, password) {
    
    return this.httpClient.post<AuthenticatedUser>(
      `${BASE}/authenticate`,{
        username,
        password
      }).pipe(
        map(
          data => {
            console.log(`DATA= ${data}`)
            sessionStorage.setItem(AUTHENTICATED_USER, String(data.user.id));
            sessionStorage.setItem(AUTHENTICATED_USER_EMAIL, data.user.email);
            sessionStorage.setItem(AUTHENTICATED_USER_SPACENAME, data.user.spaceName);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  }

 getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem(TOKEN)
  }

  getLoggedInUser() {
   let user = new UserDetail();
   user.spaceName = sessionStorage.getItem(AUTHENTICATED_USER_SPACENAME)
   user.email = sessionStorage.getItem(AUTHENTICATED_USER_EMAIL)
   user.id = +sessionStorage.getItem(AUTHENTICATED_USER) // Convert string to number using TS unary operator support
   return user;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER_SPACENAME)
    sessionStorage.removeItem(AUTHENTICATED_USER_EMAIL)
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}
