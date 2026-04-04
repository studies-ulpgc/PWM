import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  // Nota: Mueve tus carpetas 'json' e 'img' a 'src/assets/'
  private url = 'assets/json/producto.json';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<any>(this.url, { headers }).pipe(map(res => res.data));
  }

  getProductoById(id: string): Observable<any> {
    return this.getProductos().pipe(
      map(productos => productos.find(p => p.id == id)) // <--- cambio aquí
    );
  }
}