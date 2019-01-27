import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user-list.component';
import { Router } from '@angular/router';
import { UserDataService } from '../service/data/user.service';
import { UserCreate } from '../models/user-create';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user = new UserCreate();
  error = ""
  constructor(private router: Router, private userService: UserDataService) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(`Registering User ${this.user}`)
    this.userService.executeCreateUser(this.user)
          .subscribe (
            data => {
              console.log('DATA', data)
              this.router.navigate(['/login'])
            },
            response => {
              console.log('ERROR ', response)
              if (response.error && response.error.errorCode == 'VALIDATION_FAILED') {
                this.error = response.error.message
              } else
                this.error = 'Unexpected error when registering a user.'
            }
          )
    
  }
  
}
