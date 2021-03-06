import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService as UserDataService } from '../../service/data/user.service';
import { UserDetail as UserDetail } from '../../models/user-detail';
import { ConfigErrorService } from 'src/app/service/config-error.service';
import { DefaultApiCallState, LoadingApiCallState, SuccessApiCallState } from 'src/app/models/api-state';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserDetail []
  state = new DefaultApiCallState();
  
  constructor(private router: Router, private userDataService: UserDataService, private configErrorService: ConfigErrorService) { }

  ngOnInit() {
    this.loadAllUsers()
  }

  loadAllUsers() {
    this.state = new LoadingApiCallState();
    this.userDataService.executeGetAllUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(response: any): void {
    this.state = this.configErrorService.handleError(response)
    console.log(response)
  }

  handleSuccessfulResponse(response: UserDetail[]): void {
    console.log('Success ', response)
    this.users = response  
    this.state = new SuccessApiCallState("Successfully logged in");
    console.log('USERS ', this.users)
  }

  getPosts(userid:number) {
    this.router.navigate(['users', userid, 'posts'])
  }

  hasUsers() {
    return this.users && this.users.length > 0
  }
}
