import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Embedded, EmbeddedServerData } from 'src/app/user-list/user-list.component';
import { UserDetail } from 'src/app/user-list/user-detail-dto';
import { ApiEndPoint } from 'src/app/models/ApiEndPoint';
import { map } from 'rxjs/operators'
import { __values } from 'tslib';
import { UserCreate } from 'src/app/models/user-create';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpClient: HttpClient, private apiEndPoint: ApiEndPoint) { }
 
  executeGetAllUsers() {
    console.log("UserDataService ", this.httpClient.get(ApiEndPoint.GET_ALL_USERS))
    return this.httpClient.get<EmbeddedServerData>(ApiEndPoint.GET_ALL_USERS)
  }

  executeGetUser(userId: number) {
    return this.httpClient.get<UserDetail>(this.apiEndPoint.getUserUrl(userId))
  }

  executeCreateUser(userCreate: UserCreate) {
    return this.httpClient.post(ApiEndPoint.CREATE_USER,userCreate)
  }
  // executeHelloWorldBeanServiceWithPath(name: String) {
  //   return this.httpClient.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean/path-variable/${name}`)
  // }

}