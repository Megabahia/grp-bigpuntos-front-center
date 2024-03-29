import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  // Public
  public apiData = [];
  public onApiDataChange: BehaviorSubject<any>;

  /**
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private firestore: AngularFirestore ) {
    this.onApiDataChange = new BehaviorSubject('');
    this.getNotificationsData();
  }

  /**
   * Get Notifications Data
   */
  // getNotificationsData(): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get('api/notifications-data').subscribe((response: any) => {
  //       this.apiData = response;
  //       this.onApiDataChange.next(this.apiData);
  //       resolve(this.apiData);
  //     }, reject);
  //   });
  // }
  getNotificationsData(){

  }

  getCoffeeOrders() {
    return this.firestore.collection('creditosPersonas').snapshotChanges();
  }
}
