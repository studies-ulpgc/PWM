import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComentarioComponent } from '../../components/comentario/comentario.component';
import { ProductoComponent } from '../../components/producto/producto.component';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-articulo-seleccionado',
  standalone: true,
  imports: [
    CommonModule,
    HeaderGrandeComponent,
    FooterComponent,
    ComentarioComponent,
    ProductoComponent
  ],
  templateUrl: './articulo-seleccionado.component.html',
  styleUrls: ['./articulo-seleccionado.component.css']
})
export class ArticuloSeleccionadoComponent implements OnInit {
  producto: any = null;
  listaComentarios: any[] = [];
  productosRelacionados: any[] = [];
  precioEntero: string = '0';
  precioDecimal: string = '00';
  imagenMostrada: string = '';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private comentarioService: ComentarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cargarDatosProducto(id);
      }
    });

    this.comentarioService.getComentarios().subscribe(comentarios => {
      this.listaComentarios = comentarios.slice(0, 4);
      this.cdr.detectChanges();
    });
  }

  cargarDatosProducto(id: string) {
    this.producto = null;

    this.productoService.getProductoById(id).subscribe(p => {
      if (!p) return;

      const fotoUrl = p.Foto?.[0]?.formats?.medium?.url || p.Foto?.[0]?.url || '';
      const resolvedFotoUrl = fotoUrl.startsWith('/uploads/') ? fotoUrl : fotoUrl;
      const precioLimpio = String(p.Precio || '0').replace('€', '').trim();
      const [entero, decimal = '00'] = precioLimpio.split('.');

      this.producto = {
        ...p,
        fotoUrl: resolvedFotoUrl,
        tallasArray: p.Talla?.split(',').map((t: string) => t.trim()) || [],
      };
      this.precioEntero = entero;
      this.precioDecimal = (decimal + '00').slice(0, 2);
      this.imagenMostrada = resolvedFotoUrl;

      this.cargarRelacionados(p.id);

      this.cdr.detectChanges();
    });
  }

  cargarRelacionados(currentId: any) {
  this.productoService.getProductos().subscribe(all => {
    const filtrados = all.filter(x => x.id != currentId);

    if (filtrados.length === 0) return;

    const mapeados = filtrados.map(prod => {
      const fotoUrl = prod.Foto?.[0]?.formats?.medium?.url || prod.Foto?.[0]?.url || '';
      const cleanPrice = String(prod.Precio || '0').replace('€', '').trim();
      const [entero, decimal = '00'] = cleanPrice.split('.');

      return {
        ...prod,
        nombre: prod.Descripcion || prod.Subtitulo,
        precioEntero: entero,
        precioDecimal: (decimal + '00').slice(0, 2),
        fotoUrl: fotoUrl.startsWith('/uploads/') ? fotoUrl : fotoUrl
      };
    });

    this.productosRelacionados = Array.from({ length: 4 }, (_, i) => {
      return mapeados[i % mapeados.length];
    });

    this.cdr.detectChanges();
  });
}

  obtenerRating(producto: any): number {
    if (!producto.Valoracion || producto.Valoracion.length === 0) return 0;
    const nombreArchivo = producto.Valoracion[0].name;
    const rating = parseInt(nombreArchivo.split('_')[0]);
    return isNaN(rating) ? 0 : rating;
  }

  agregarAlCarrito() {
    console.log('Producto añadido al carrito');
  }

  cambiarImagen(miniatura: any) {
    if (miniatura) {
      const url = miniatura.formats?.medium?.url || miniatura.formats?.large?.url || miniatura.url;
      setTimeout(() => {
        this.imagenMostrada = url ? url : '';
        this.cdr.detectChanges();
      }, 0);
    }
  }
}
