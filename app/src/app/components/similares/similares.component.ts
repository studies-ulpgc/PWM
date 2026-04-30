import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from '../producto/producto.component';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-similares',
  standalone: true,
  imports: [CommonModule, ProductoComponent],
  templateUrl: './similares.component.html',
  styleUrls: ['./similares.component.css']
})
export class SimilaresComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  productosSimilares: any[] = [];

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos: any[]) => {
      const mapped = productos.map(p => {
        const fotoUrl =
          p.Foto?.[0]?.formats?.medium?.url ||
          p.Foto?.[0]?.formats?.large?.url ||
          p.Foto?.[0]?.url ||
          '';

        const cleanPrice = String(p.Precio || '0').replace('€', '').trim();
        const [entero, decimal = '00'] = cleanPrice.split('.');

        const resolvedFotoUrl = fotoUrl.startsWith('/uploads/')
          ? fotoUrl
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

      setTimeout(() => {
        const listaExtendida = [...mapped, ...mapped, ...mapped];
        this.productosSimilares = listaExtendida.slice(0, 8);

        this.cdr.detectChanges();
      }, 0);

    }, err => console.error('Error al cargar similares', err));
  }

  scroll(direccion: number) {
    if (this.scrollContainer) {
      const contenedor = this.scrollContainer.nativeElement;
      const scrollAmount = 300;
      contenedor.scrollBy({ left: direccion * scrollAmount, behavior: 'smooth' });
    }
  }
}
