import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserDataService } from 'src/app/service/data/user.service';
import { ConfigErrorService } from 'src/app/service/config-error.service';
import { LoadingApiCallState, SuccessApiCallState } from 'src/app/models/api-state';
import { UserDetail } from 'src/app/models/user-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user = new UserDetail()
  constructor(  private router: Router,  private authenticationService: AuthenticationService,
    private userService: UserDataService,
    private configErrorService: ConfigErrorService) { }

    ngOnInit() {
      this.loadUser()
    }
  
    loadUser() {
      this.user.state = new LoadingApiCallState();
      console.log(`Execute GET post for userId=${this.authenticationService.getLoggedInUser().id}`)
      this.userService.executeGetUser(this.authenticationService.getLoggedInUser().id).subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorResponse(error)
      )
    }
  
    handleErrorResponse(response: any): void {
      console.log(response)
      this.user.state = this.configErrorService.handleError(response)
    }
  
    handleSuccessfulResponse(response: UserDetail): void {
      console.log('Success ', response)
      this.user = response
      this.user.state = new SuccessApiCallState("Successfully loaded user detail");
      console.log('USER ', this.user)
    }
    navigateToUserPosts () {
      this.router.navigate(['users', this.user.id, 'posts'])
    }
}
