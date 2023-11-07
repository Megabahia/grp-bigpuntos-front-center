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
export class ProductosService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * ESte metodo sirve para listar las empresas comerciales
     */
    obtenerListaEmpresasComerciales(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/comercial`, datos);
    }

    /**
     * Este metodo sirve para listar todos los productos
     */
    obtenerListaProductos(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/list/`, datos);
    }

    /**
     * Este metodo sirve para crear un producto
     */
    crearProducto(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/create/`, datos);
    }

    /**
     * Este metodo sirve para listar un producto
     */
    obtenerProducto(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/central/productos/listOne/${id}`);
    }

    /**
     * Este metodo sirve para actualizar un producto
     */
    actualizarProducto(datos, id) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/update/${id}`, datos);
    }

    /**
     * Este metodos sirve para eliminar un producto
     */
    eliminarProducto(id) {
        return this._httpClient.delete<any>(`${environment.apiUrl}/central/productos/delete/${id}`);
    }
}
