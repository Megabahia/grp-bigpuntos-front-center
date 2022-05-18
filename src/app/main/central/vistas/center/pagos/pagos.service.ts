import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private _httpClient: HttpClient) {
  }

  obtenerListaPagos(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/corp/movimientoCobros/reporte/empresas/`, datos);
  }

}
