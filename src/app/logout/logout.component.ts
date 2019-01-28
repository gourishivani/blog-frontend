import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private basicAuthenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.basicAuthenticationService.logout();
  }

}
