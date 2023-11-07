import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

/**
 * Bigpuntos
 * Center
 */
@Injectable({
    providedIn: 'root'
})
export class PublicacionesService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Este metodo sirve para listar todas la publicaciones
     */
    obtenerListaPublicaciones(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/publicaciones/listFull/`, datos);
    }

    /**
     * Este metodo sirve para crear una publicacion
     */
    crearPublicacion(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/publicaciones/create/`, datos);
    }

    /**
     * Este metodo sirve para obtener una publicacion
     */
    obtenerPublicacion(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/central/publicaciones/listOne/${id}`);
    }

    /**
     * ESte metodo sirve para actualizar una publicacion
     */
    actualizarPublicacion(datos, id) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/publicaciones/update/${id}`, datos);
    }

    /**
     * ESte metod sirve para eliminar una publicacion
     */
    eliminarPublicacion(id) {
        return this._httpClient.delete<any>(`${environment.apiUrl}/central/publicaciones/delete/${id}`);
    }

    /**
     * Este metodo sirve para generar el reporte
     */
    obtenerReportePublicaciones(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/publicaciones/reporte/`, datos);
    }
}
