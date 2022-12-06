import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private _httpClient: HttpClient) {
  }

  obtenerListaEmpresas(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/central/empresas/list/`, datos);
  }

  crearEmpresa(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/central/empresas/create/`, datos);
  }

  actualizarEmpresa(datos, id) {
    return this._httpClient.post<any>(`${environment.apiUrl}/central/empresas/update/${id}`, datos);
  }

  obtenerEmpresa(id) {
    return this._httpClient.get<any>(`${environment.apiUrl}/central/empresas/listOne/${id}`);
  }

  eliminarEmpresa(id) {
    return this._httpClient.delete<any>(`${environment.apiUrl}/central/empresas/delete/${id}`);
  }
}
