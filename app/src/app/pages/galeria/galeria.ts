import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Producto } from '../../components/producto/producto';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, HeaderGrande, Footer, Producto],
  templateUrl: './galeria.html',
  styleUrls: ['./galeria.css']
})
export class Galeria implements OnInit {
  listaProductos: any[] = []; // <--- Declarar la variable

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe(data => {
      const mapped = data.map(p => {
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

      // Repetir productos para llenar la galería
      this.listaProductos = Array.from({ length: 12 }, (_, i) => mapped[i % mapped.length]);
    });
  }
}