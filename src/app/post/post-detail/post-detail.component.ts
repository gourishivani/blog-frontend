import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../models/comment';
import { PostService } from '../../service/data/post.service';
import { AlertService } from '../../service/alert.service';
import { UserDataService } from '../../service/data/user.service';
import { CommentService, EmbeddedCommentData } from '../../service/data/comment.service';
import { CommentCreate } from '../../models/comment-create';
import { User } from '../../user/user-list/user-list.component';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/basic-authentication.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post = new Post()
  postId = null
  comments: Comment[]
  userComment = new CommentCreate()
  loading = false
  errorMessageFromService = ""
  error = ''

  constructor(private activatedRoute:ActivatedRoute,
    private authenticationService: AuthenticationService,
    private postDataService: PostService, private commentService: CommentService, 
    private alertService: AlertService,
    private router: Router) { 
    this.postId = this.activatedRoute.snapshot.params['postId'];
  }

  ngOnInit() {
    this.loadPost()
    this.loadComments()
  }

  loadPost() {
    console.log(`Execute GET post for postId=${this.postId}`)
    this.postDataService.executeGetPost(this.postId).subscribe(
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

  handleSuccessfulResponse(response: Post): void {
    this.loading = false
    console.log('Success ', response)
    this.post = response
    console.log('POST ', this.post)
  }

  loadComments() {
    this.commentService.executeGetCommentsForPost(this.postId).subscribe(
      response => this.handleSuccessfulLoadCommentsResponse(response),
      error => this.handleErrorLoadCommentsResponse(error)
    )
  }

  handleErrorLoadCommentsResponse(response: any): void {
    this.loading = false
    console.log(response)
    console.log(response.message)
    console.log(response.error.message)
    this.errorMessageFromService = response.error.message
    // this.alertService.error = error;
  }

  handleSuccessfulLoadCommentsResponse(response: EmbeddedCommentData): void {
    this.loading = false
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
              console.log('ERROR ', response)
              if (response.error && response.error.errorCode == 'VALIDATION_FAILED') {
                this.error = response.error.message
              } else
                this.error = 'Unexpected error when registering a user.'
            }
          )
    
  }

  assignForeignKeysToComment() {
    let post = new Post();
    post.id = this.post.id
    let commentor = this.authenticationService.getLoggedInUser()
    this.userComment.post = post;
    this.userComment.commentor = commentor;
  }
}
