import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorApiCallState } from '../models/api-state';

@Injectable({
  providedIn: 'root'
})
export class ConfigErrorService {

  constructor() { }

handleError(error: HttpErrorResponse) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      let message:string
      if (error.error && (error.error.errorCode == 'VALIDATION_FAILED' || error.status == 409)) {
        message =  error.error.message
      } else {
        message = 'Unexpected error'
      }
      let state = new ErrorApiCallState(message);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      return state
  };
}
