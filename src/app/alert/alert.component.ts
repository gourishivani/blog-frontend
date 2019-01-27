import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../service/alert.service';

// Alert Component is from here: http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial
@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}



// import { Component, OnInit, OnDestroy, Input} from '@angular/core';
// import { Subscription } from 'rxjs';
// import { AlertService } from '../service/alert.service';
// import { Alert, AlertType } from '../model/alert';


// @Component({
//     selector: 'alert',
//     templateUrl: './alert.component.html',
//     styleUrls: ['./alert.component.css']
// })

// // Alert Component is from here: http://jasonwatmore.com/post/2017/06/25/angular-2-4-alert-toaster-notifications
// export class AlertComponent implements OnInit, OnDestroy  {
//     @Input() id: string;

//     alerts: Alert[] = [];

//     constructor(private alertService: AlertService) { }

//     ngOnInit() {
//         this.alertService.getAlert(this.id).subscribe((alert: Alert) => {
//             if (!alert.message) {
//                 // clear alerts when an empty alert is received
//                 this.alerts = [];
//                 return;
//             }

//             // add alert to array
//             this.alerts.push(alert);
//         });
//     }
//     ngOnDestroy() {
//         this.alertService.
//     }

//     removeAlert(alert: Alert) {
//         this.alerts = this.alerts.filter(x => x !== alert);
//     }

//     cssClass(alert: Alert) {
//         if (!alert) {
//             return;
//         }

//         // return css class based on alert type
//         switch (alert.type) {
//             case AlertType.Success:
//                 return 'alert alert-success';
//             case AlertType.Error:
//                 return 'alert alert-danger';
//             case AlertType.Info:
//                 return 'alert alert-info';
//             case AlertType.Warning:
//                 return 'alert alert-warning';
//         }
//     }
// }