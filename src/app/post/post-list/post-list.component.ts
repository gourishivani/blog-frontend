import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post';
import { PostService, PostsEmbeddedData } from '../../service/data/post.service';
import { UserDataService } from 'src/app/service/data/user.service';
import { UserDetail } from 'src/app/models/user-detail';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LoadingApiCallState, SuccessApiCallState, DefaultApiCallState, ErrorApiCallState } from 'src/app/models/api-state';
import { ConfigErrorService } from 'src/app/service/config-error.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  userId = null
  user = new UserDetail()
  posts: Post[]
  state = new DefaultApiCallState();

  constructor(
    private activatedRoute: ActivatedRoute, private route: Router,
    private authenticationService: AuthenticationService,
    private postDataService: PostService, 
    private userDataService: UserDataService,
    private configErrorService: ConfigErrorService) {
  }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.loadUser()
    // this.user = this.getUser()
    this.loadPostsForUser()
  }

  navigateToPostDetail(postId:number) {
    console.log(`this.user.id=${this.user.id}`)
    this.route.navigate(['/users', this.user.id, 'posts', postId])
  }

  navigateToPostSave() {
    console.log(`this.user.id=${this.user.id}`)
    this.route.navigate(['/users', this.user.id, 'posts', 'save'])
  }

  loadUser() {
    this.user.state = new LoadingApiCallState();
    this.userDataService.executeGetUser(this.userId).subscribe(
      response => this.handleLoadUserSuccessfulResponse(response),
      error => this.handleLoadUserErrorResponse(error)
    )
  }

  handleLoadUserErrorResponse(response: any): void {
    console.log(response.message)
    this.user.state = this.configErrorService.handleError(response)
  }

  handleLoadUserSuccessfulResponse(response: UserDetail): void {
    this.user = response
    console.log('User ', this.user)
    this.user.state = new SuccessApiCallState("Successfully loaded user");
  }

  loadPostsForUser() {
    this.state = new LoadingApiCallState();
    this.postDataService.executeGetPostsForUser(this.userId).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(response: any): void {
    console.log(response)
    this.state = this.configErrorService.handleError(response)
  }

  handleSuccessfulResponse(response: Post[]): void {
    this.state = new SuccessApiCallState("Successfully loaded posts");
    console.log('Success ', response)
    this.posts = response  
    console.log('POSTS ', this.posts)
  }

  hasPosts() {
    // console.log('has posts ', this.posts && this.posts.length > 0)
    return this.posts && this.posts.length > 0
  }

  isLoading() {
    return this.state.loading
  }

  hasError() {
    return this.state instanceof ErrorApiCallState || this.state.error
  }
}
