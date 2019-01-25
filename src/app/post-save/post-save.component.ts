import { Component, OnInit } from '@angular/core';
import { Post } from '../post-list/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-save',
  templateUrl: './post-save.component.html',
  styleUrls: ['./post-save.component.css']
})
export class PostSaveComponent implements OnInit {
  post: Post
  constructor(
    // private postService: PostDataService,
    // private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.post = new Post()
    this.post.title = "My New Post"
  }

  savePost() {
    console.log("Saving post ", this.post)
    // this.postService.createPost('bloguser', this.todo)
    //     .subscribe (
    //       data => {
    //         console.log(data)
    //         this.router.navigate(['todos'])
    //       }
    //     )
  }

}
