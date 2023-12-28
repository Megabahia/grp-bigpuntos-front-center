import {Component, OnInit} from '@angular/core';
import {CargarComisionesService} from '../../cargar-comisiones.service';
import {ActivatedRoute} from '@angular/router';

/**
 * Bigpuntos
 * center
 * ESta pantalla sirve para ver los registros de un documento
 * Rutas:
 * `${environment.apiUrl}/corp/creditoArchivos/view/creditos/preaprobados/negocios/${id}`
 */

@Component({
    selector: 'app-view-file-comisione',
    templateUrl: './view-file-comisiones.component.html',
    styleUrls: ['./view-file-comisiones.component.scss']
})
export class ViewFileComisionesComponent implements OnInit {

    public cabecera = [];
    public filas = [];

    constructor(
        private _cargarCreditosNegocios: CargarComisionesService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe((params) => {
            const archivoId = params.archivoId;
            this._cargarCreditosNegocios.verDatosArchivosComisiones(archivoId).subscribe(info => {
                this.cabecera = info.shift();
                this.filas = info;
                console.log(this.cabecera);
                console.log(this.filas);
            });
        });
    }

    ngOnInit(): void {
    }

}
