import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoint } from 'src/app/models/ApiEndPoint';
import { Post } from 'src/app/post-list/post';
import { Comment } from 'src/app/post-detail/comment';
import { CommentCreate } from 'src/app/models/comment-create';

export interface EmbeddedCommentData {
  _embedded:EmbeddedComment
}
export interface EmbeddedComment {
  data:Comment[]
}


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient, private apiEndPoint: ApiEndPoint) { }
 
  executeGetCommentsForPost(postId: number) {
    console.log("PostService ", postId)
    return this.httpClient.get<EmbeddedCommentData>(this.apiEndPoint.getAllCommentsUrl(postId))
  }

  executeCreateComment(comment: CommentCreate): any {
    return this.httpClient.post(ApiEndPoint.CREATE_COMMENT,comment)
  }

}
