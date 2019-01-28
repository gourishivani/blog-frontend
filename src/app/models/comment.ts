import { ApiCallState, DefaultApiCallState } from './api-state';

export class Comment {
    id: number;
    content: string;
    commentorName: String;
    commentorId: number;
    created: Date;
    public state: ApiCallState;
    constructor() {
        this.state = new DefaultApiCallState()
     }
}

// export class Post {
//     id: number;
//     title: string;
//     description: string;
//     created: Date;
//     lastModified: Date;
// }