import { User } from '../user/user-list/user-list.component';
import { Post } from './post';

export class CommentCreate {
    content: string;
    commentor: User;
    post: Post;
}