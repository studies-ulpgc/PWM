import { Component, OnInit } from '@angular/core'; // <--- Faltaba importar esto
import { CommonModule } from '@angular/common';
import { HeaderCorto } from '../../components/header-corto/header-corto';
import { Footer } from '../../components/footer/footer';
import { Comentario } from '../../components/comentario/comentario';
import { Producto } from '../../components/producto/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-articulo-seleccionado',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderCorto, 
    Footer, 
    Comentario, 
    Producto
  ],
  templateUrl: './articulo-seleccionado.html',
  styleUrls: ['./articulo-seleccionado.css']
})
export class ArticuloSeleccionado implements OnInit {
  // Variables que usa el HTML
  producto: any = null; 
  listaComentarios: any[] = [];
  productosRelacionados: any[] = [];
  precioEntero: string = '0';
  precioDecimal: string = '00';
  imagenMostrada: string = '';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}// <--- No pongas "...", déjalo vacío si no inyectas nada todavía

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productoService.getProductoById(id).subscribe(p => {
        if (!p) return;

        // 🔹 MAPEAR igual que en HOME
        const fotoUrl =
          p.Foto?.[0]?.formats?.medium?.url ||
          p.Foto?.[0]?.url ||
          '';

        const resolvedFotoUrl = fotoUrl.startsWith('/uploads/')
          ? 'assets' + fotoUrl
          : fotoUrl;

        const precioLimpio = String(p.Precio || '0').replace('€', '').trim();
        const [entero, decimal = '00'] = precioLimpio.split('.');

        // 🔥 PRODUCTO FINAL
        this.producto = {
          ...p,
          fotoUrl: resolvedFotoUrl,
          tallasArray: p.Talla?.split(',').map((t: string) => t.trim()) || [],
        };

        // 🔥 PRECIO separado
        this.precioEntero = entero;
        this.precioDecimal = (decimal + '00').slice(0, 2);

        // 🔥 IMAGEN PRINCIPAL
        this.imagenMostrada = resolvedFotoUrl;

        // 🔥 RELACIONADOS (simple)
        this.productoService.getProductos().subscribe(all => {
          this.productosRelacionados = all
            .filter(x => x.id != p.id)
            .slice(0, 4);
        });

      });
    }
  }
  
  agregarAlCarrito() { 
    console.log('Producto añadido al carrito'); 
  }

  cambiarImagen(url: string) { 
    this.imagenMostrada = url; 
  }
}