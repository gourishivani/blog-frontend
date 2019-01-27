import { Component, OnInit } from '@angular/core';
import { Post } from '../post-list/post';
import { Router } from '@angular/router';
import { PostService } from '../service/data/post.service';
import { PostCreate } from '../models/post-create';
import { SimpleAuthenticationService } from '../service/simple-authentication.service';

@Component({
  selector: 'app-post-save',
  templateUrl: './post-save.component.html',
  styleUrls: ['./post-save.component.css']
})
export class PostSaveComponent implements OnInit {
  post: PostCreate
  error: string = ""

  constructor(
    private postService: PostService,
    // private route: ActivatedRoute,
    private router: Router,
    private simpleAuthenticationService: SimpleAuthenticationService) { }

  ngOnInit() {
    this.post = new PostCreate()
    this.post.title = "My New Post"
  }

  savePost() {
    console.log("Saving post ", this.post)
    this.post.authorId = this.simpleAuthenticationService.getLoggedInUser().id;
    this.postService.executeCreatePost(this.post)
          .subscribe (
            data => {
              console.log('DATA', data)
              this.router.navigate([`/users/${this.post.authorId}/posts`])
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
}
