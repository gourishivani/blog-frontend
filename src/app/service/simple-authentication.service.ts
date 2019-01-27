import { Injectable } from '@angular/core';
import { User } from '../user/user-list/user-list.component';

@Injectable({
  providedIn: 'root'
})
export class SimpleAuthenticationService {

  constructor() { }
  authenticate(username:string, password:string) {
    //console.log('before ' + this.isUserLoggedIn());
    if(username==="bloguser" && password === 'bloguser') {
      sessionStorage.setItem('authenticaterUser', username);
      //console.log('after ' + this.isUserLoggedIn());
      return true;
    }
    return false;
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
  }
}
