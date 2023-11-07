import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

/**
 * Bigpuntos
 * Center
 */

@Injectable({
    providedIn: 'root',
})
export class ParametrizacionesService {
    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Este metodo sirve para listar todas las parametrizaciones
     */
    obtenerListaParametrizaciones(datos) {
        return this._httpClient.post<any>(
            `${environment.apiUrl}/central/param/list/`,
            datos
        );
    }

    /**
     * Este metodo sirve para listar una parametrizacion
     */
    obtenerParametro(id) {
        return this._httpClient.get<any>(
            `${environment.apiUrl}/central/param/listOne/${id}`
        );
    }

    /**
     * Este metodo sirve para listar todas las parametrizaciones por tipo
     */
    obtenerListaPadres(tipo) {
        return this._httpClient.post<any>(
            `${environment.apiUrl}/central/param/list/tipo/todos/`,
            {tipo}
        );
    }

    /**
     * Este metodo sirve para listar todas las parametrizaciones por tipo
     */
    obtenerListaTipos() {
        return this._httpClient.get<any>(
            `${environment.apiUrl}/central/param/list/tipo/`
        );
    }

    /**
     * Este metodo sirve para crear una parametrizacion
     */
    crearParametro(datos) {
        return this._httpClient.post<any>(
            `${environment.apiUrl}/central/param/create/`,
            datos
        );
    }

    /**
     * Este metodo sirve para listar todas las parametrizaciones de un padre
     */
    obtenerListaHijos(nombre, tipo) {
        return this._httpClient.post<any>(
            `${environment.apiUrl}/central/param/list/filtro/nombre`,
            {tipo, nombre}
        );
    }

    /**
     * Este metodo sirve para eliminar una parametrizacion
     */
    eliminarParametro(id) {
        return this._httpClient.delete<any>(
            `${environment.apiUrl}/central/param/delete/${id}`
        );
    }

    /**
     * Este metodo sirve para actualizar una parametrizacion
     */
    actualizarParametro(datos) {
        console.log(datos);
        return this._httpClient.post<any>(
            `${environment.apiUrl}/central/param/update/${datos._id}`,
            datos
        );
    }

    /**
     * Este metodo sirve para obtener una empresa
     */
    obtenerEmpresa(datos) {
        return this._httpClient.post<any>(
            `${environment.apiUrl}/corp/empresas/listOne/filtros/`,
            datos
        );
    }

    /**
     * Este metodo sirve para listar todas las empresas comerciales
     */
    obtenerEmpresas(datos) {
        return this._httpClient.post<any>(
            `${environment.apiUrl}/corp/empresas/list/comercial`,
            datos
        );
    }

    /**
     * Este metodo sirve para obtener una parametrizacion por filtro y nombre
     */
    obtenerParametroNombreTipo(nombre, tipo) {
        return this._httpClient.post<any>(
            `${environment.apiUrl}/central/param/list/listOne`,
            {nombre, tipo}
        );
    }

    /**
     * Este metodo sirve para generar el reporte
     */
    exportar() {
        const httpOptions = {
            responseType: 'blob' as 'json'
        };
        return this._httpClient.get<any>(
            `${environment.apiUrl}/central/param/exportar/`, httpOptions);
    }
}
