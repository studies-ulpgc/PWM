import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Producto } from '../../components/producto/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderGrande, Footer, Producto],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  carruselItems: any[] = [];
  productos: any[] = [];

  constructor(private productoService: ProductoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
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

      this.productos = Array(3).fill(mapped).flat();
      this.carruselItems = [...mapped.slice(0, 3), ...mapped.slice(0, 3)];

      this.cdr.detectChanges();
    }, err => console.error('Error al cargar productos', err));
  }

  trackById(index: number, item: any) {
    return item?.id || index;
  }
}