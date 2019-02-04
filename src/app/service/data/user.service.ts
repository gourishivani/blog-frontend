import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { __values } from 'tslib';
import { UserCreate } from 'src/app/models/user-create';
import { UserDetail } from 'src/app/models/user-detail';
import { GET_ALL_USERS, CREATE_USER } from 'src/app/app.constants';
import { ApiUtils } from 'src/app/models/api-utils';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpClient: HttpClient, private utils: ApiUtils) { }
 
  executeGetAllUsers() {
    return this.httpClient.get<UserDetail[]>(GET_ALL_USERS)
  }

  executeGetUser(userId: number) {
    console.log(`Will try to load userId=${userId} from URL ${this.utils.getUserUrl(userId)}`)
    return this.httpClient.get<UserDetail>(this.utils.getUserUrl(userId))
  }

  executeCreateUser(userCreate: UserCreate) {
    return this.httpClient.post(CREATE_USER,userCreate)
  }
}