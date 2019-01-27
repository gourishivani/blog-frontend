import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from './post';
import { User } from '../user-list/user-list.component';
import { SimpleAuthenticationService } from '../service/simple-authentication.service';
import { PostService, PostsEmbeddedData } from '../service/data/post.service';
import { AlertService } from '../service/alert.service';

export interface EmbeddedServerData {
  _embedded:Embedded
}
export interface Embedded {
  data:Post[]
}


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  userId = null
  user = null
  posts: Post[]
  loading = false
  errorMessageFromService = ""

  constructor(
    private activatedRoute: ActivatedRoute, private route: Router,
    private simpleAuthenticationService: SimpleAuthenticationService,
    private postDataService: PostService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.user = this.getUser()
    this.loadPostsForUser()
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

  loadPostsForUser() {
    this.postDataService.executeGetPostsForUser(this.userId).subscribe(
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

  handleSuccessfulResponse(response: PostsEmbeddedData): void {
    this.loading = false
    console.log('Success ', response)
    if (!response._embedded) {
      this.posts = []  
    } else
      this.posts = response._embedded.data
    console.log('POSTS ', this.posts)
  }

  hasPosts() {
    // console.log('has posts ', this.posts && this.posts.length > 0)
    return this.posts && this.posts.length > 0
  }
}
