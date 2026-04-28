import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../producto/producto'; 
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-similares',
  standalone: true,
  imports: [CommonModule, Producto],
  templateUrl: './similares.html',
  styleUrls: ['./similares.css']
})
export class Similares implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  productosSimilares: any[] = [];

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos: any[]) => {
      this.productosSimilares = productos.slice(0, 8).map(p => {
        const fotoUrl =
          p.Foto?.[0]?.formats?.medium?.url ||
          p.Foto?.[0]?.formats?.large?.url ||
          p.Foto?.[0]?.url ||
          '';

        const cleanPrice = String(p.Precio || '0').replace('€', '').trim();
        const [entero, decimal = '00'] = cleanPrice.split('.');

        const resolvedFotoUrl = fotoUrl.startsWith('/uploads/')
          ? 'assets' + fotoUrl
          : fotoUrl;

        return {
          ...p,
          id: p.id,
          nombre: p.Descripcion || p.Subtitulo || 'Producto',
          precioEntero: entero || '0',
          precioDecimal: (decimal + '00').slice(0, 2),
          fotoUrl: resolvedFotoUrl,
        };
      });
      
      this.cdr.detectChanges(); 
    });
  }

  scroll(direccion: number) {
    const contenedor = this.scrollContainer.nativeElement;
    const scrollAmount = 350;
    contenedor.scrollBy({ left: direccion * scrollAmount, behavior: 'smooth' });
  }
}