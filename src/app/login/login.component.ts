import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { ConfigErrorService } from '../service/config-error.service';
import { DefaultApiCallState, LoadingApiCallState, SuccessApiCallState, ErrorApiCallState } from '../models/api-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //NOTE: Typically, these details are not hard-coded in production. However, this is here only for ease of testing
  username = 'johndoe@example.com'
  userid = 1
  password = 'test123'
  
  state = new DefaultApiCallState();

  constructor(private router: Router,
    private authService: AuthenticationService,
    private configErrorService: ConfigErrorService
    ) { }

  ngOnInit() {
  }

  handlerLogin() {
    this.state = new LoadingApiCallState();
    this.authService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['users', this.userid, 'posts'])
            this.state = new SuccessApiCallState("Successfully logged in");
          },
          error => {
            this.state = this.configErrorService.handleError(error)
            console.log(error)
          }
        )
  }

  hasError() {
    return this.state instanceof ErrorApiCallState || this.state.error
  }

}
