import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, docData, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  constructor(private firestore: Firestore) {}

  getProductos(): Observable<any[]> {
    const productosRef = collection(this.firestore, 'producto');
    return collectionData(productosRef, { idField: 'id' });
  }

  getProductoById(id: string): Observable<any> {
    const productoRef = doc(this.firestore, `producto/${id}`);
    return docData(productoRef, { idField: 'id' });
  }
}
