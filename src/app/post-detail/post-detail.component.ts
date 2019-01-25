import { Component, OnInit } from '@angular/core';
import { Post } from '../post-list/post';
import { ActivatedRoute } from '@angular/router';
import { Comment } from './comment';
import { SimpleAuthenticationService } from '../service/simple-authentication.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post = new Post()
  postId = null
  comments: Comment[]
  userComment = new Comment()

  constructor(private activatedRoute:ActivatedRoute,
    private simpleAuthenticationService: SimpleAuthenticationService) { 
    this.postId = this.activatedRoute.snapshot.params['postId'];
  }

  ngOnInit() {
    this.post = new Post()
    this.post.id = this.postId
    this.post.title = `Fun Post ${this.postId}`
    this.post.description = `Short Description ${this.postId}`
    this.post.created = new Date()
    this.post.lastModified = new Date()

    this.comments = [
      this.comment(1, "Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.", "Anthony", 1, new Date()),
      this.comment(1, "The parameter value can be any valid template expression, (see the Template expressions section of the Template Syntax page) such as a string literal or a component property. In other words, you can control the format through a binding the same way you control the birthday value through a binding.     Write a second component that binds the pipe's format parameter to the component's format property. Here's the template for that component:", "Beta", 2, new Date()),
      this.comment(1, "threa", "sdf", 3, new Date()),
      this.comment(1, "safsdfewr waehiriowejriolsm fjwheiuarj hwheariujwea iuawhroiwjelrnf howijeroinio jnajpo  wjeroj", "sdfs", 4, new Date()),
      this.comment(1, "hel waioerhpo j wkajnre", "wtgh", 3, new Date()),
      this.comment(1, "ahiojfok jknwjpoejrpk m", "atgtre", 11, new Date()),
      this.comment(1, "jeorj kljer ", "tgf", 21, new Date()),
      this.comment(1, "ojpwojerjoo ", "mhgr", 1, new Date()),
    ]
  }

  saveComment() {
    console.log(`Saving comment ${this.userComment}`)

    this.userComment = new Comment()
    this.userComment.content = 'New Comment' // clear comment to accommodate new ones
  }

  comment(id: number,
    content: string,
    commentorName: string,
    commentorId: number,
    created: Date) : Comment {
      let comment = new Comment();
      comment.id = id
      comment.commentorName = commentorName
      comment.commentorId = commentorId
      comment.created = created
      comment.content = content
      return comment;
    }
}
