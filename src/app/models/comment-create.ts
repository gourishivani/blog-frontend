import { Post } from './post';
import { ApiCallState, DefaultApiCallState } from './api-state';
import { User } from './User';

export class CommentCreate {
    content: string;
    commentor: User;
    post: Post;
    public state: ApiCallState;
    constructor() {
        this.state = new DefaultApiCallState()
     }
}