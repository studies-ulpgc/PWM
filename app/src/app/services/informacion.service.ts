import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // Importamos getDoc
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private firestore = inject(Firestore);

  getInformacionPorId(id: string): Observable<any> {
    const docRef = doc(this.firestore, 'informacion', id);

    return from(getDoc(docRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          return snapshot.data();
        }
        return null;
      })
    );
  }
}