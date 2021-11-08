import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from "@angular/material/snack-bar";
import { NotificationComponent } from "@shared/components/notification/notification.component";
import { META_DATA } from "@shared/components/notification/notification.metadata";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private meta = META_DATA;

    constructor(private snackBar: MatSnackBar) {}

    public info(message: string, config?: MatSnackBarConfig<string>): MatSnackBarRef<NotificationComponent> {
        return this.snackBar.openFromComponent(NotificationComponent, 
            { ...this.meta.info, data: message, ...config }
        );
    }

    public warning(message: string, config?: MatSnackBarConfig<string>): MatSnackBarRef<NotificationComponent> {
        return this.snackBar.openFromComponent(NotificationComponent, 
            { ...this.meta.warning, data: message, ...config }
        );
    }

    public success(message: string, config?: MatSnackBarConfig<string>): MatSnackBarRef<NotificationComponent> {
        return this.snackBar.openFromComponent(NotificationComponent, 
            { ...this.meta.success, data: message, ...config }
        );
    }

    public error(message: string, config?: MatSnackBarConfig<string>): MatSnackBarRef<NotificationComponent> {
        return this.snackBar.openFromComponent(NotificationComponent, 
            { ...this.meta.error, data: message, ...config }
        );
    }
}