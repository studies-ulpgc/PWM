import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterDataService {
  constructor(private firestore: Firestore) {}

  getIdiomas(): Observable<any[]> {
    const idiomasRef = collection(this.firestore, 'idiomas');
    return from(getDocs(idiomasRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }

  getInternacional(): Observable<any[]> {
    const interRef = collection(this.firestore, 'internacional');
    return from(getDocs(interRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }
}