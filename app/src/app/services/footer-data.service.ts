import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterDataService {
  constructor(private http: HttpClient) {}

  getIdiomas(): Observable<any[]> {
    return this.http.get<any>('assets/json/idiomas.json').pipe(
      map(res => res.data || [])
    );
  }

  getInternacional(): Observable<any[]> {
    return this.http.get<any>('assets/json/internacional.json').pipe(
      map(res => res.data || [])
    );
  }
}