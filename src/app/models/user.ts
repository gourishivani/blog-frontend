import { ApiCallState, DefaultApiCallState } from './api-state';

export class User {
  public id: number;
  public name: string;
  public spaceName: string;
  public created: Date;
  public state: ApiCallState;
  constructor() {
      this.state = new DefaultApiCallState()
    }
}
