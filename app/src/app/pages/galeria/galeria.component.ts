import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductoComponent } from '../../components/producto/producto.component';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, HeaderGrandeComponent, FooterComponent, ProductoComponent],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  listaProductos: any[] = [];

  precioSeleccionado: number = 100;

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  actualizarPrecio(evento: any) {
    this.precioSeleccionado = evento.target.value;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const categoria = params['categoria'];
      this.listaProductos = [];
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
        this.cdr.detectChanges();
      });
    });
  }
}
