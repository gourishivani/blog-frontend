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
    console.log("PostService ", this.httpClient.get<PostsEmbeddedData>(this.apiEndPoint.getAllPostsForUsersUrl(userId)))
    return this.httpClient.get<PostsEmbeddedData>(this.apiEndPoint.getAllPostsForUsersUrl(userId))
    // console.log("UserDataService ", this.httpClient.get(ApiEndPoint.GET_ALL_USERS))
    // return this.httpClient.get<EmbeddedServerData>(ApiEndPoint.GET_ALL_USERS)
  }

  executeGetPost(postId: number) {
    return this.httpClient.get<Post>(this.apiEndPoint.getPostUrl(postId))
  }
}
