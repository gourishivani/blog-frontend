import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// From Here: https://stackblitz.com/edit/angular-7-registration-login-example?file=app%2F_services%2Falert.service.ts
// http://jasonwatmore.com/post/2017/06/25/angular-2-4-alert-toaster-notifications
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
      // clear alert message on route change
      router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              if (this.keepAfterNavigationChange) {
                  // only keep for a single location change
                  this.keepAfterNavigationChange = false;
              } else {
                  // clear alert
                  this.subject.next();
              }
          }
      });
  }

  success(message: string, keepAfterNavigationChange = false) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}

// import { Injectable } from '@angular/core';
// import { Router, NavigationStart } from '@angular/router';
// import { Observable, Subject } from 'rxjs';
// // import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/filter';
// // import { filter } from 'rxjs/operator/filter';
// // import 'rxjs/operator/filter';
// import { Alert, AlertType } from '../model/alert';
// import { filter } from 'rxjs/operators';

// @Injectable()
// export class AlertService {
//     private subject = new Subject<Alert>();
//     private keepAfterRouteChange = false;

//     constructor(private router: Router) {
//         // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
//         router.events.subscribe(event => {
//             if (event instanceof NavigationStart) {
//                 if (this.keepAfterRouteChange) {
//                     // only keep for a single route change
//                     this.keepAfterRouteChange = false;
//                 } else {
//                     // clear alert messages
//                     this.clear();
//                 }
//             }
//         });
//     }

//     // subscribe to alerts
//     getAlert(alertId?: string): Observable<any> {
//         // RXJs 5.5 supports filter in a different format as per here: https://github.com/ngrx/platform/issues/564
//         return this.subject.asObservable().pipe(filter((x: Alert) => x && x.alertId === alertId));
//     }

//     // convenience methods
//     success(message: string) {
//         this.alert(new Alert({ message, type: AlertType.Success }));
//     }

//     error(message: string) {
//         this.alert(new Alert({ message, type: AlertType.Error }));
//     }

//     info(message: string) {
//         this.alert(new Alert({ message, type: AlertType.Info }));
//     }

//     warn(message: string) {
//         this.alert(new Alert({ message, type: AlertType.Warning }));
//     }

//     // main alert method    
//     alert(alert: Alert) {
//         this.keepAfterRouteChange = alert.keepAfterRouteChange;
//         this.subject.next(alert);
//     }

//     // clear alerts
//     clear(alertId?: string) {
//         this.subject.next(new Alert({ alertId }));
//     }
// }