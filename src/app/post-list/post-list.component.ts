import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from './post';
import { User } from '../user-list/user-list.component';
import { SimpleAuthenticationService } from '../service/simple-authentication.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  userId = null
  user = null;
  posts: Post[]

  constructor(
    private activatedRoute: ActivatedRoute, private route: Router,
    private simpleAuthenticationService: SimpleAuthenticationService) {
  }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.user = this.getUser()
    this.posts = [
      this.getPost(1),
      this.getPost(2),
      this.getPost(3),
      this.getPost(4),
    ]
  }

  getUser() {
    let user = new User()
    user.created = new Date()
    user.id = this.userId
    user.name = "Bert"
    user.spaceName = "Bates Motel"

    return user
  }

  navigateToPostDetail(postId:number) {
    console.log(`this.user.id=${this.user.id}`)
    this.route.navigate(['/users', this.user.id, 'posts', postId])
  }

  navigateToPostSave() {
    console.log(`this.user.id=${this.user.id}`)
    this.route.navigate(['/users', this.user.id, 'posts', 'save'])
  }
  
  getPost(postId:number) {
    let post = new Post()
    post.id = postId
    post.title = `Fun Post ${postId}`
    post.description = `The result of this pipe is not reevaluated when the input is mutated. To avoid the need to reformat the date on every change-detection cycle, treat the date as an immutable object and change the reference when the pipe needs to run again. ${postId}`
    post.created = new Date()
    post.lastModified = new Date()

    return post;
  }
}
