export class ApiEndPoint {
  public static readonly BASE:string = 'http://localhost:8080/'

public static readonly GET_ALL_USERS:string = ApiEndPoint.BASE + "users"
  public static readonly CREATE_USER:string = ApiEndPoint.GET_ALL_USERS
  public static readonly CREATE_POST:string = `${ApiEndPoint.BASE}/posts`
  public static readonly CREATE_COMMENT:string = `${ApiEndPoint.BASE}comments`

  getUserUrl(userId: number) {
    return ApiEndPoint.GET_ALL_USERS + "/" + userId;
  }
  
  getAllPostsForUsersUrl(userId: number) {
    return `${ApiEndPoint.GET_ALL_USERS}/${userId}/posts`;
  }

  getPostUrl(postId: number) {
    return `${ApiEndPoint.BASE}/posts/${postId}`;
  }

  getAllCommentsUrl(postId: number): string {
    return `${ApiEndPoint.BASE}posts/${postId}/comments`;
  }


}