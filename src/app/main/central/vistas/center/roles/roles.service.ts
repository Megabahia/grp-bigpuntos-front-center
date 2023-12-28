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
export class RolesService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * ESte metodo sirve para listar un rol
     */
    obtenerListaRoles(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/roles/list/`, datos);
    }

    /**
     * ESte metodo sirve para crear un rol
     */
    crearRol(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/roles/create/`, {rol: datos});
    }

    /**
     * ESte metodo sirve para actulizar un rol
     */
    actualizarRol(datos) {
        if (datos.tipoUsuario || datos.tipoUsuario === '') {
            delete datos.tipoUsuario;
        }
        return this._httpClient.post<any>(`${environment.apiUrl}/central/roles/update/${datos._id}`, {rol: datos});
    }

    /**
     * ESte metodo sirve para listar un rol
     */
    obtenerRol(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/central/roles/listOne/${id}`);
    }

    /**
     * Este metodo sirve para eliminar un rol
     */
    eliminarRol(id) {
        return this._httpClient.delete<any>(`${environment.apiUrl}/central/roles/delete/${id}`);
    }
}
