// services/comentario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private url = 'assets/json/comentario.json'; // Asegúrate de tener este JSON

  constructor(private http: HttpClient) {}

  getComentarios(): Observable<any[]> {
    const urlWithCacheBust = `${this.url}?t=${Date.now()}`;
    return this.http.get<any>(urlWithCacheBust).pipe(map(res => res.data));
  }
}