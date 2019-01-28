import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { AuthenticationService } from '../service/basic-authentication.service';

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
  
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  loading = false;

  constructor(private router: Router,
    private basicAuthenticationService: AuthenticationService,
    private alertService: AlertService
    // ,private basicAuthenticationService: BasicAuthenticationService
    ) { }

  ngOnInit() {
  }

  handleJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['users', this.userid, 'posts'])
            this.invalidLogin = false      
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }

}
