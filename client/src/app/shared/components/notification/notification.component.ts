import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

    constructor(
        public ref: MatSnackBarRef<NotificationComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: string
    ) { }

}
