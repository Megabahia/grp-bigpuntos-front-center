import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Bigpuntos
 * Center
 * Esta pantalla sirve para revisar los documentos
 * Rutas:
 * No tiene llamado de rutas
 */

@Component({
    selector: 'app-automotriz-revision-documentos',
    templateUrl: './automotriz-revision-documentos.component.html',
    styleUrls: ['./automotriz-revision-documentos.component.scss']
})
export class AutomotrizRevisionDocumentosComponent implements OnInit {

    @Input() checks: string;
    @Output() pantalla = new EventEmitter<number>();

    public completado;

    constructor() {
        this.completado = false;
    }

    ngOnInit(): void {
    }

    completar() {
        this.pantalla.emit(2);
    }

}
