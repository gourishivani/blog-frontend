import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentCreate } from 'src/app/models/comment-create';
import { Comment } from 'src/app/models/comment';
import { ApiUtils } from 'src/app/models/api-utils';
import { CREATE_COMMENT } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient, private apiEndPoint: ApiUtils) { }
 
  executeGetCommentsForPost(postId: number) {
    console.log("PostService ", postId)
    return this.httpClient.get<Comment[]>(this.apiEndPoint.getAllCommentsUrl(postId))
  }

  executeCreateComment(comment: CommentCreate): any {
    return this.httpClient.post(CREATE_COMMENT,comment)
  }

}
