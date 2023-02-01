import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    constructor(private _httpClient: HttpClient) {
    }

    obtenerListaEmpresas(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/empresas/list/`, datos);
    }

    obtenerListaEmpresasComerciales(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/comercial`, datos);
    }

    obtenerListaProductos(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/list/`, datos);
    }

    obtenerListaProductosLanding(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/list-free-landing/`, datos);
    }

    obtenerProductoLanding(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/central/productos/listOne-landing/${id}`);
    }

    crearProductoLanding(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/create-landing/`, datos);
    }

    actualizarProductoLanding(datos, id) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/update-landing/${id}`, datos);
    }

    eliminarProductoLanding(id) {
        return this._httpClient.delete<any>(`${environment.apiUrl}/central/productos/delete-landing/${id}`);
    }

    crearProducto(datos) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/create/`, datos);
    }

    obtenerProducto(id) {
        return this._httpClient.get<any>(`${environment.apiUrl}/central/productos/listOne/${id}`,);
    }

    actualizarProducto(datos, id) {
        return this._httpClient.post<any>(`${environment.apiUrl}/central/productos/update/${id}`, datos);
    }

    eliminarProducto(id) {
        return this._httpClient.delete<any>(`${environment.apiUrl}/central/productos/delete/${id}`,);
    }
}
