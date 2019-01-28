import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../models/comment';
import { PostService } from '../../service/data/post.service';
import { UserDataService } from '../../service/data/user.service';
import { CommentService, EmbeddedCommentData } from '../../service/data/comment.service';
import { CommentCreate } from '../../models/comment-create';
import { User } from '../../user/user-list/user-list.component';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/basic-authentication.service';
import { ConfigErrorService } from 'src/app/service/config-error.service';
import { DefaultApiCallState, LoadingApiCallState, SuccessApiCallState } from 'src/app/models/api-state';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post = new Post()
  postId = null
  comments: Comment[]
  commentState = new DefaultApiCallState();
  userComment = new CommentCreate()
  // loading = false
  // errorMessageFromService = ""
  // error = ''

  constructor(private activatedRoute:ActivatedRoute,
    private authenticationService: AuthenticationService,
    private postDataService: PostService, private commentService: CommentService, 
    private configErrorService: ConfigErrorService,
    private router: Router) { 
    this.postId = this.activatedRoute.snapshot.params['postId'];
  }

  ngOnInit() {
    this.loadPost()
    this.loadComments()
  }

  loadPost() {
    this.post.state = new LoadingApiCallState();
    console.log(`Execute GET post for postId=${this.postId}`)
    this.postDataService.executeGetPost(this.postId).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(response: any): void {
    console.log(response)
    this.post.state = this.configErrorService.handleError(response)
  }

  handleSuccessfulResponse(response: Post): void {
    console.log('Success ', response)
    this.post = response
    this.post.state = new SuccessApiCallState("Successfully logged in");
    console.log('POST ', this.post)
  }

  loadComments() {
    this.commentState = new LoadingApiCallState();
    this.commentService.executeGetCommentsForPost(this.postId).subscribe(
      response => this.handleSuccessfulLoadCommentsResponse(response),
      error => this.handleErrorLoadCommentsResponse(error)
    )
  }

  handleErrorLoadCommentsResponse(response: any): void {
    this.commentState = this.configErrorService.handleError(response)
    console.log(response)
  }

  handleSuccessfulLoadCommentsResponse(response: EmbeddedCommentData): void {
    this.commentState = new SuccessApiCallState("Successfully logged in");
    console.log('Success ', response)
    if (!response._embedded) {
      this.comments = []  
    } else
      this.comments = response._embedded.data
    console.log('COMMENTS ', this.comments)
  }

  saveComment(createCommentForm: NgForm) {
    console.log("Saving comment ", this.userComment)
    this.assignForeignKeysToComment()
    this.userComment.state =  new LoadingApiCallState();
    this.commentService.executeCreateComment(this.userComment)
          .subscribe (
            data => {
              console.log('DATA', data)
              this.userComment = new CommentCreate() // Clear existing comment
              // [Optimization] Could try to avoid a page re-load if this new comment is added to the top of the comment array.
              //  However, most real life comments have moderation and are not published immediately

              // NOTE: Angular by default disables sameUrlNavigation. So instead of navigating, We can just reload the comments instead of doing premature optimization.
              // this.router.navigate([`/users/${this.userId}/posts/${this.postId}`])
              createCommentForm.reset()
              this.loadComments()
            },
            response => {
              this.userComment.state = this.configErrorService.handleError(response)
              console.log('ERROR ', response)
            }
          )
  }


  hasError() {
    return this.commentState.error || this.userComment.state.error || this.post.state.error
  }

  getErrorMessage() {
    if (this.commentState.error) return this.commentState.error
    if (this.userComment.state.error) return this.userComment.state.error
    if (this.post.state.error) return this.post.state.error
  }

  assignForeignKeysToComment() {
    let post = new Post();
    post.id = this.post.id
    let commentor = this.authenticationService.getLoggedInUser()
    this.userComment.post = post;
    this.userComment.commentor = commentor;
  }
}
