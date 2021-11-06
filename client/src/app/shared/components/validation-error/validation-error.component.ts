import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '@core/services/validation.service';

@Component({
    selector: 'validation-error',
    templateUrl: './validation-error.component.html'
})
export class ValidationErrorComponent {
    @Input() control: FormControl;

    public get errorMessages(): string[] {
        if (!this.control) return [];

        const messages: string[] = [];
        for (const propertyName in this.control.errors) {
            messages.push(ValidationService.getValidationErrorMessage(propertyName, this.control.errors[propertyName]));
        }

        return messages;
    }

}
