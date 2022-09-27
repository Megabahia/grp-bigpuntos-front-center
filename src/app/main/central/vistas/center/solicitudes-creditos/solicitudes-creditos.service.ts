import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesCreditosService {

  constructor(private _httpClient: HttpClient, private firestore: AngularFirestore) {
  }
  obtenerLecturaArchivos(id) {
    return this._httpClient.get<any>(`${environment.apiUrl}/corp/creditoPersonas/lecturaArchivos/${id}`);
  }
  obtenerSolicitudesCreditos(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPersonas/list/`, datos);
  }
  obtenersolicitudCredito(id) {
    return this._httpClient.get<any>(`${environment.apiUrl}/corp/creditoPersonas/listOne/${id}`);
  }
  actualizarSolictudesCreditos(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPersonas/update/${datos.get('id')}`, datos);
  }
  actualizarSolictudesCreditosObservacion(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPersonas/update/${datos._id}`, datos);
  }
  getCreditosFirebase() {
    return this.firestore.collection('creditosPersonas').snapshotChanges();
  }
  deleteCoffeeOrder(data) {
    console.log(data);
    return this.firestore.collection('creditosPersonas').doc(data).delete();
  }
}
