import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private productos = {
    data: [
      {
        id: 22,
        Descripcion: "Camisa oxford",
        Precio: "15.99 € ",
        Descripcion_larga: "Camisa de manga larga y cuello camisero. Cierre botonadura frontal. Corte holgado. Tejido oxford 100% algodón.",
        Talla: "XS, S, M, L, XL",
        Votos: "1000+",
        Subtitulo: "Ref: 1910/305/400",
        Categoria: "Camisas",
        Foto: [
          {
            url: "/uploads/frente_6822be159f.png"
          }
        ]
      }
      // Add more products as needed
    ]
  };

  constructor() { }

  getProductos(): Observable<any> {
    return of(this.productos);
  }

  getHeader(): Observable<any> {
    return of({ data: [] }); // Placeholder
  }

  getFooter(): Observable<any> {
    return of({ data: [] }); // Placeholder
  }
}