import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CargarComisionesService {

    constructor(private _httpClient: HttpClient) {
    }

    obtenerListaEmpresasCorps(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/comercial`, datos);
    }

    obtenerListaEmpresasIfis(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/ifis`, datos);
    }

    crearArchivoComisiones(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoArchivos/create/comisiones/`, datos);
    }

    obtenerListaArchivosComisiones(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoArchivos/list/comisiones/`, datos);
    }

    eliminarArchivosComisiones(id) {
        return this._httpClient.delete<any>(`${environment.apiUrl}/corp/creditoArchivos/delete/comisiones/${id}`);
    }

    subirArchivosComisiones(id) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoArchivos/upload/comisiones/${id}`, {});
    }

    verDatosArchivosComisiones(id: number) {
        return this._httpClient.get<any>(`${environment.apiUrl}/corp/creditoArchivos/view/comisiones/${id}`);
    }
}
