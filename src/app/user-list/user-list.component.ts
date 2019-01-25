import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class User {
  public id:number;
  public name:string;
  public spaceName:string;
  public created: Date;
  
  constructor() { }
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User []

  // users = []

  constructor(private router: Router) { }

  ngOnInit() {
    this.users = [
      this.newUser(1, "foo", "myworld", new Date()),
      this.newUser(2, "bar", "bar myworld", new Date()),
      this.newUser(3, "bez", "bez myworld", new Date()),
      this.newUser(4, "baxter", "baxter myworld", new Date()),
      this.newUser(5, "ticker", "ticker myworld", new Date()),
      this.newUser(6, "symbol", "symbol myworld", new Date())
    ]
  }

  newUser(id:number, name:string, spaceName:string,
    created: Date) {
    let userLocal = new User()
    userLocal.name = name
    userLocal.spaceName = spaceName
    userLocal.created = created
    userLocal.id = id
    return userLocal
  }
  getPosts(userid:number) {
    this.router.navigate(['users', userid, 'posts'])
  }

}
