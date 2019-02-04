import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post';
import { PostCreate } from 'src/app/models/post-create';
import { ApiUtils } from 'src/app/models/api-utils';
import { CREATE_POST } from 'src/app/app.constants';

export interface PostsEmbeddedData {
  _embedded:Embedded
}
export interface Embedded {
  data:Post[]
}


@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient, private apiEndPoint: ApiUtils) { }
 
  executeCreatePost(post: PostCreate): any {
    console.log("PostService create", post)
    return this.httpClient.post(CREATE_POST, post)
  }

  executeGetPostsForUser(userId: number) {
    return this.httpClient.get<Post[]>(this.apiEndPoint.getAllPostsForUsersUrl(userId))
  }

  executeGetPost(postId: number) {
    console.log("PostService executeGetPost", postId)
    console.log("PostService executeGetPostURL=", this.apiEndPoint.getPostUrl(postId))
    return this.httpClient.get<Post>(this.apiEndPoint.getPostUrl(postId))
  }
}
