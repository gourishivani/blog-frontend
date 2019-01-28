import { GET_ALL_USERS, BASE } from '../app.constants';

export class ApiUtils {

    getUserUrl(userId: number) {
      return GET_ALL_USERS + "/" + userId;
    }
    
    getAllPostsForUsersUrl(userId: number) {
      return `${GET_ALL_USERS}/${userId}/posts`;
    }
  
    getPostUrl(postId: number) {
      return `${BASE}/posts/${postId}`;
    }
  
    getAllCommentsUrl(postId: number): string {
      return `${BASE}posts/${postId}/comments`;
    }
  }