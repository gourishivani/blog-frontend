import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService as UserDataService } from '../../service/data/user.service';
import { AlertService } from '../../service/alert.service';
import { UserDetail as UserDetail } from '../../models/user-detail-dto';

export class User {
  public id:number;
  public name:string;
  public spaceName:string;
  public created: Date;
  
  constructor() { }
}

export interface EmbeddedServerData {
  _embedded:Embedded
}
export interface Embedded {
  data:UserDetail[]
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserDetail []
  errorMessageFromService = ""
  // users = []
  loading = true

  constructor(private router: Router, private userDataService: UserDataService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadAllUsers()
  }

  loadAllUsers() {
    this.userDataService.executeGetAllUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(response: any): void {
    this.loading = false
    console.log(response)
    console.log(response.message)
    console.log(response.error.message)
    this.errorMessageFromService = response.error.message
    // this.alertService.error = error;
  }

  handleSuccessfulResponse(response: EmbeddedServerData): void {
    this.loading = false
    console.log('Success ', response)
    // response.map(res => res)
    if (!response._embedded) {
      this.users = []  
    } else
      this.users = response._embedded.data

    
    console.log('USERS ', this.users)
  }

  getPosts(userid:number) {
    this.router.navigate(['users', userid, 'posts'])
  }

}
