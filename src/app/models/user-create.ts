import { ApiCallState, DefaultApiCallState } from './api-state';

export class UserCreate{
    public email:string;
    public name:string;
    public spaceName:string;
    public passwordHash: string;
    public state: ApiCallState;
    constructor() {
        this.state = new DefaultApiCallState()
     }
}
