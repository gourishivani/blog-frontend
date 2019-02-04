import { ApiCallState, DefaultApiCallState } from './api-state';

export class UserDetail {
    public id:number;
    public email:string;
    public name:string;
    public spaceName:string;
    public created: Date;
    
    public state: ApiCallState;
    constructor() {
        this.state = new DefaultApiCallState()
     }
}
