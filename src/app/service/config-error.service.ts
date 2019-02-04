import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorApiCallState } from '../models/api-state';

@Injectable({
  providedIn: 'root'
})
export class ConfigErrorService {

  constructor() { }

handleError(errorResponse: HttpErrorResponse) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      let message:string
      if (errorResponse.status == 401)
        message = "Invalid Credentials"
      else if (errorResponse.error && (errorResponse.error.errorCode == 'VALIDATION_FAILED' || errorResponse.status == 409)) {
        message =  errorResponse.error.message
      } else {
        message = 'Unexpected error'
      }
      let state = new ErrorApiCallState(message);
      console.error(
        `Backend returned code ${errorResponse.status}, ` +
        `body was: ${errorResponse.error}`);
      return state
  };
}
