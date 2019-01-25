import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user = new User();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(`Registering User ${this.user}`)
    this.router.navigate(['/login'])
  }
  
}
