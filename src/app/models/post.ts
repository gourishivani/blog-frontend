import { ApiCallState, DefaultApiCallState } from './api-state';

export class Post {
    id: number;
    title: string;
    description: string;
    created: Date;
    lastModified: Date;
    public state: ApiCallState;
    constructor() {
        this.state = new DefaultApiCallState()
     }
}