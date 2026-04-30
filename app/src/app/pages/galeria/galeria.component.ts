import { Component, OnInit, ChangeDetectorRef, inject, Injector, runInInjectionContext } from '@angular/core';
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
  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private injector = inject(Injector);

  listaProductos: any[] = [];
  private productosCargados: any[] = [];
  
  precioSeleccionado: number = 100;
  private categoriaActual: string = '';

  constructor() {}

  actualizarPrecio(evento: any) {
    this.precioSeleccionado = Number(evento.target.value);
    this.aplicarFiltros(); 
  }

  aplicarFiltros() {
    const categoriasReales = ['Novedades', 'Camisas', 'Chalecos']; 

    let filtrados = this.productosCargados;
    if (this.categoriaActual && categoriasReales.includes(this.categoriaActual)) {
      filtrados = filtrados.filter(p => p.Categoria === this.categoriaActual);
    }

    filtrados = filtrados.filter(p => {
      const precioNum = parseFloat(`${p.precioEntero}.${p.precioDecimal}`);
      return precioNum <= this.precioSeleccionado;
    });

    if (filtrados.length > 0) {
      this.listaProductos = Array.from({ length: 12 }, (_, i) => filtrados[i % filtrados.length]);
    } else {
      this.listaProductos = [];
    }

    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      runInInjectionContext(this.injector, () => {
        this.categoriaActual = params['categoria'];
        
        this.listaProductos = [];
        this.cdr.detectChanges();

        this.productoService.getProductos().subscribe(data => {
          this.productosCargados = data.map(p => {
            const fotoUrl = p.Foto?.[0]?.formats?.medium?.url || p.Foto?.[0]?.url || '';
            const cleanPrice = String(p.Precio || '0').replace('€', '').trim();
            const [entero, decimal = '00'] = cleanPrice.split('.');
            const resolvedFotoUrl = fotoUrl.startsWith('/uploads/') ? fotoUrl : fotoUrl;

            return {
              ...p,
              id: p.id,
              nombre: p.Descripcion || p.Subtitulo || 'Producto',
              precioEntero: entero || '0',
              precioDecimal: (decimal + '00').slice(0, 2),
              fotoUrl: resolvedFotoUrl,
            };
          });

          this.aplicarFiltros();
        });
      });
    });
  }
}