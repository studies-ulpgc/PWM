// services/comentario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private url = 'assets/json/comentario.json'; // Asegúrate de tener este JSON

  constructor(private http: HttpClient) {}

  getComentarios(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<any>(this.url, { headers }).pipe(map(res => res.data));
  }
}