import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { __values } from 'tslib';
import { UserCreate } from 'src/app/models/user-create';
import { EmbeddedServerData } from 'src/app/user/user-list/user-list.component';
import { UserDetail } from 'src/app/models/user-detail-dto';
import { GET_ALL_USERS, CREATE_USER } from 'src/app/app.constants';
import { ApiUtils } from 'src/app/models/api-utils';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpClient: HttpClient, private utils: ApiUtils) { }
 
  executeGetAllUsers() {
    return this.httpClient.get<EmbeddedServerData>(GET_ALL_USERS)
  }

  executeGetUser(userId: number) {
    console.log(`Will try to load userId=${userId} from URL ${this.utils.getUserUrl(userId)}`)
    return this.httpClient.get<UserDetail>(this.utils.getUserUrl(userId))
  }

  executeCreateUser(userCreate: UserCreate) {
    return this.httpClient.post(CREATE_USER,userCreate)
  }
}