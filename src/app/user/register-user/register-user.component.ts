import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user-list.component';
import { Router } from '@angular/router';
import { UserDataService } from '../../service/data/user.service';
import { UserCreate } from '../../models/user-create';
import { ErrorApiCallState, LoadingApiCallState } from 'src/app/models/api-state';
import { ConfigErrorService } from 'src/app/service/config-error.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user = new UserCreate();
  constructor(private router: Router, private userService: UserDataService, private configError: ConfigErrorService) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(`Registering User ${this.user}`)
    this.user.state = new LoadingApiCallState()
    this.userService.executeCreateUser(this.user)
          .subscribe (
            data => {
              console.log('DATA', data)
              this.router.navigate(['/login'])
            },
            response => {
              console.log('ERROR ', response)
              this.user.state = this.configError.handleError(response)
              console.log('userstate ', this.user)
            }
          )
  }

  hasError() {
    return this.user.state instanceof ErrorApiCallState && this.user.state.error
  }
  
}
