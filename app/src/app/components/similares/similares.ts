import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../producto/producto'; 
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-similares',
  standalone: true,
  imports: [CommonModule, Producto],
  templateUrl: './similares.html'
})
export class Similares implements OnInit {
  productosSimilares: any[] = [];

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(prods => {
      this.productosSimilares = prods.slice(0, 4).map(p => ({
        ...p,
        Descripcion: p.Descripcion || 'Sin título',
        Precio: p.Precio || '0.00',
        fotoUrl: p.Foto?.[0]?.url ? 'assets' + p.Foto[0].url : ''
      }));
      
      this.cdr.detectChanges(); 
    });
  }
}