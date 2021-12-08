import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Usuario {
    id: string;
    email: string;
    password: string;
    rol: string;
    empresa: string;
}
export const compararPassword:ValidatorFn= (control: AbstractControl):ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');
    return password && passwordConfirm && password.value != passwordConfirm.value ? { diffPassword: true } : null;
  };
