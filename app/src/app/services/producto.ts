import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  // Nota: Mueve tus carpetas 'json' e 'img' a 'src/assets/'
  private url = 'assets/json/producto.json';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    const urlWithCacheBust = `${this.url}?t=${Date.now()}`;
    return this.http.get<any>(urlWithCacheBust).pipe(map(res => res.data));
  }

  getProductoById(id: string): Observable<any> {
    return this.getProductos().pipe(
      map(productos => productos.find(p => p.id == id)) // <--- cambio aquí
    );
  }
}