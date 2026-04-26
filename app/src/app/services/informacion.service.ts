import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // Importamos getDoc
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private firestore = inject(Firestore);

  getInformacionPorId(id: string): Observable<any> {
    // 1. Creamos la referencia al documento exacto
    const docRef = doc(this.firestore, 'informacion', id);

    // 2. Usamos 'from' para convertir la promesa de Firebase en Observable
    // Esto es mucho más estable que docData para evitar el error de _Query
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