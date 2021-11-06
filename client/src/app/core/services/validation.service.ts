import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    static usernameValidators = [
        Validators.minLength(4), Validators.maxLength(16), ValidationService.username
    ];

    static passwordValidators = [
        Validators.minLength(6), Validators.maxLength(50), ValidationService.password
    ];

    static getValidationErrorMessage(validatorName: string, validatorValue?: any): string {
        const config = {
            required: 'Обязательное поле',
            minlength: `Минимальная длина - ${validatorValue.requiredLength}`,
            maxlength: `Максимальная длина - ${validatorValue.requiredLength}`,
            max: `Максимальное значение - ${validatorValue.max}`,
            min: `Минимальное значение - ${validatorValue.min}`,
            username: 'Имя пользователя должно состоять из маленьких латинских букв или цифр',
            password: 'Пароль должен содержать большие буквы, маленькие и цифры',
        };

        return config[validatorName];
    }

    static username(control: AbstractControl): ValidationErrors {
        const USERNAME_REGEXP = /^[0-9a-z]*$/;
        if (!control.value) return null;

        return (control.value as string).match(USERNAME_REGEXP) ? null : { username: true };
    }

    static password(control: AbstractControl): ValidationErrors {
        const PASSWORD_REGEXP = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).+)\S$/;
        if (!control.value) return null;

        return (control.value as string).match(PASSWORD_REGEXP) ? null : { password: true };
    }
}
