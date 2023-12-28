import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';

/**
 * Bigpuntos
 * CEnter
 */
@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * ESte metodo sirve para listar una empresa
     */
    obtenerListaEmpresas(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/filtro`, datos);
    }

    /**
     * Este metodo sirve para listar usuarios
     */
    obtenerListaUsuarios(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/usuarios/list/`, datos);
    }

    /**
     * Este metodo sirve para obtener un usuario
     */
    obtenerUsuario(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/central/usuarios/listOne/${id}`);
    }

    /**
     * ESte metodo sirve para crear un usuario
     */
    crearUsuario(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/usuarios/create/`, datos);
    }

    /**
     * ESte metodo sirve para actualizar un usuario
     */
    actualizarUsuario(datos) {
        if (datos.tipoUsuario) {
            delete datos.tipoUsuario;
        }
        return this._httpClient.post<any>(`${environment.apiUrl}/central/usuarios/update/${datos._id}`, datos);
    }

    /**
     * Este metodo sirve para eliminar un usuario
     */
    eliminarUsuario(id) {
        return this._httpClient.delete<any>(`${environment.apiUrl}/central/usuarios/delete/${id}`);
    }
}
