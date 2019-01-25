import { Component, OnInit } from '@angular/core';
import { SimpleAuthenticationService } from '../service/simple-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private simpleAuthenticationService: SimpleAuthenticationService
  ) { }

  ngOnInit() {
    this.simpleAuthenticationService.logout();
  }

}
