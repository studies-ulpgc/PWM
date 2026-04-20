import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable, from, map, defer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenIzqService {
  constructor(private firestore: Firestore, private injector: Injector) {}

  getImagenConfig(): Observable<any> {
    return defer(() => runInInjectionContext(this.injector, () => {
      const colRef = collection(this.firestore, 'imagen_izq');
      return from(getDocs(colRef)).pipe(
        map(snapshot => {
          if (snapshot.empty) return null;
          
          const docData: any = snapshot.docs[0].data();
          
          return docData?.data?.imagen_lateral?.[0] || null;
        })
      );
    }));
  }
}