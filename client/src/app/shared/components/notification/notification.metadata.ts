import { MatSnackBarConfig } from "@angular/material/snack-bar";

export const META_DATA: {[key: string]: MatSnackBarConfig<string>} = {
    info: {
        panelClass: 'notification-info',
        data: 'Notification',
        duration: 4000
    },
    warning: {
        panelClass: 'notification-warning',
        data: 'Warning!',
        duration: 4000
    },
    success: {
        panelClass: 'notification-success',
        data: 'Success!',
        duration: 4000
    },
    error: {
        panelClass: 'notification-error',
        data: 'Error!',
        duration: null
    }
};