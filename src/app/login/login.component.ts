import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleAuthenticationService } from '../service/simple-authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../service/alert.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'bloguser'
  userid = 123
  password = 'bloguser'
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  loading = false;

  constructor(private router: Router,
    private simpleAuthenticationService: SimpleAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService,
    private alertService: AlertService
    // ,private basicAuthenticationService: BasicAuthenticationService
    ) { }

  ngOnInit() {
  }

  handleLogin() {
    // console.log(this.username);
    //if(this.username==="bloguser" && this.password === 'bloguser') {
    if(this.simpleAuthenticationService.authenticate(this.username, this.password)) {
      //Redirect to Welcome Page
      this.router.navigate(['/users'])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }

//   handleLogin() {
//     this.loading = true;
//     this.simpleAuthenticationService.executeAuthenticationService(this.username, this.password)
//         .pipe(first())
//         .subscribe(
//             data => {
//                 this.router.navigate(['/home']);
//             },
//             error => {
//                 this.alertService.error(error);
//                 this.loading = false;
//             });
// }

  
  handleBasicAuthLogin() {
    // console.log(this.username);
    //if(this.username==="bloguser" && this.password === 'bloguser') {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['users', this.userid, 'posts'])
            // this.router.navigate(['users', this.username])
            this.invalidLogin = false      
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }

  /*
  handleJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['welcome', this.username])
            this.invalidLogin = false      
          },
          error => {
            console.log(error)
            this.invalidLogin = true
          }
        )
  }

*/
}
