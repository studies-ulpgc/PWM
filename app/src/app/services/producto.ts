import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  // Nota: Mueve tus carpetas 'json' e 'img' a 'src/assets/'
  private url = 'assets/json/producto.json';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    return this.http.get<any>(this.url).pipe(map(res => res.data));
  }

  getProductoById(id: string): Observable<any> {
    return this.getProductos().pipe(
      map(productos => productos.find(p => p.id === id))
    );
  }
}