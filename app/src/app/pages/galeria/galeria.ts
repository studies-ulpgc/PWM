import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Producto } from '../../components/producto/producto';
import { ProductoService } from '../../services/producto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, HeaderGrande, Footer, Producto],
  templateUrl: './galeria.html',
  styleUrls: ['./galeria.css']
})
export class Galeria implements OnInit {
  listaProductos: any[] = [];

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const categoria = params['categoria'];
      this.listaProductos = []; // Reset para forzar cambio visual
      this.cdr.detectChanges();
      this.productoService.getProductos().subscribe(data => {
        let productos = data.map(p => {
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

        if (categoria) {
          productos = productos.filter(p => p.Categoria === categoria);
        }

        this.listaProductos = Array.from({ length: 12 }, (_, i) => productos[i % productos.length]);
        this.cdr.detectChanges(); // Forzar detección de cambios
      });
    });
  }
}