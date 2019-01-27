import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoint } from 'src/app/models/ApiEndPoint';
import { Post } from 'src/app/post-list/post';
import { PostCreate } from 'src/app/models/post-create';

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
  constructor(private httpClient: HttpClient, private apiEndPoint: ApiEndPoint) { }
 
  executeCreatePost(post: PostCreate): any {
    console.log("PostService create", post)
    return this.httpClient.post(ApiEndPoint.CREATE_POST, post)
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
