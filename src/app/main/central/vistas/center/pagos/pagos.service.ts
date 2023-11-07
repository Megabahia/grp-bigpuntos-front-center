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
export class PagosService {

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * ESte metodo sirve para obtener un reporte de los movimientos de los cobros
   */
  obtenerListaPagos(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/corp/movimientoCobros/reporte/empresas/`, datos);
  }

}
