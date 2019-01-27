import { User } from '../user-list/user-list.component';
import { Post } from '../post-list/post';

export class CommentCreate {
    content: string;
    commentor: User;
    post: Post;
}