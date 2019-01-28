import { User } from '../user/user-list/user-list.component';
import { Post } from './post';
import { ApiCallState, DefaultApiCallState } from './api-state';

export class CommentCreate {
    content: string;
    commentor: User;
    post: Post;
    public state: ApiCallState;
    constructor() {
        this.state = new DefaultApiCallState()
     }
}