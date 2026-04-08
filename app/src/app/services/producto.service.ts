import { Injectable } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private firestore;

  constructor() {
    if (getApps().length === 0) {
      initializeApp(environment.firebase);
    }
    this.firestore = getFirestore();
  }

  getProductos(): Observable<any[]> {
    console.log('Cargando productos desde Firestore...');
    const productosRef = collection(this.firestore, 'producto');
    return from(getDocs(productosRef)).pipe(
      map(snapshot => {
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return productos;
      })
    );
  }

  getProductoById(id: string): Observable<any> {
    console.log('Buscando producto con id:', id);
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
  }
}
