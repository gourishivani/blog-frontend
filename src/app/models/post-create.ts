import { ApiCallState, DefaultApiCallState } from './api-state';

export class PostCreate {
    title: string;
    description: string;
    authorId:number
    public state: ApiCallState;
    constructor() {
        this.state = new DefaultApiCallState()
     }
}