import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Parametrizacion {
    id: string;
    nombre: string;
    tipo: string;
    descripcion: string;
    tipoVariable: string;
    valor: string;
    idPadre: string;
    config: string;
    // minimo: string;
    // maximo: string;
}
