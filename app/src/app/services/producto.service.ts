import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc } from '@angular/fire/firestore';
import { Observable, Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  private refreshSource = new Subject<void>();
  refresh$ = this.refreshSource.asObservable();

  notifyUpdate() {
    this.refreshSource.next();
  }

  getProductos(): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      const productosRef = collection(this.firestore, 'producto');
      return from(getDocs(productosRef)).pipe(
        map(snapshot => {
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        })
      );
    });
  }

  getProductoById(id: string): Observable<any> {
    return runInInjectionContext(this.injector, () => {
      const productoRef = doc(this.firestore, `producto/${id}`);
      return from(getDoc(productoRef)).pipe(
        map(snapshot => {
          if (snapshot.exists()) {
            return { id: snapshot.id, ...snapshot.data() };
          } else {
            console.log('Producto no encontrado');
            return null;
          }
        })
      );
    });
  }
}