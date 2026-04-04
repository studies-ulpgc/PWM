import { Component, OnInit } from '@angular/core'; // <--- Faltaba importar esto
import { CommonModule } from '@angular/common';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Comentario } from '../../components/comentario/comentario';
import { Producto } from '../../components/producto/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto';
import { ComentarioService } from '../../services/comentario';

@Component({
  selector: 'app-articulo-seleccionado',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderGrande, 
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
    private productoService: ProductoService,
    private comentarioService: ComentarioService
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
          miniaturas: p.miniaturas || []
        };

        // 🔥 PRECIO separado
        this.precioEntero = entero;
        this.precioDecimal = (decimal + '00').slice(0, 2);

        // 🔥 IMAGEN PRINCIPAL
        this.imagenMostrada = resolvedFotoUrl;

        // 🔥 RELACIONADOS (simple)
        this.productoService.getProductos().subscribe(all => {
          const relacionadosMapped = all
            .filter(x => x.id != p.id)
            .slice(0, 4)
            .map(prod => {
              const fotoUrl =
                prod.Foto?.[0]?.formats?.medium?.url ||
                prod.Foto?.[0]?.formats?.large?.url ||
                prod.Foto?.[0]?.url ||
                '';

              const cleanPrice = String(prod.Precio || '0').replace('€', '').trim();
              const [entero, decimal = '00'] = cleanPrice.split('.');

              const resolvedFotoUrl = fotoUrl.startsWith('/uploads/')
                ? 'assets' + fotoUrl
                : fotoUrl;

              return {
                ...prod,
                id: prod.id,
                nombre: prod.Descripcion || prod.Subtitulo || 'Producto',
                precioEntero: entero || '0',
                precioDecimal: (decimal + '00').slice(0, 2),
                fotoUrl: resolvedFotoUrl,
              };
            });

          // Si hay menos de 4, repetir
          this.productosRelacionados = Array.from({ length: 4 }, (_, i) => relacionadosMapped[i % relacionadosMapped.length]);
        });

      });
    }

    // Cargar comentarios
    this.comentarioService.getComentarios().subscribe(comentarios => {
      // Repetir comentarios si hay pocos
      this.listaComentarios = Array.from({ length: 4 }, (_, i) => comentarios[i % comentarios.length]);
    });
  }
  
  agregarAlCarrito() { 
    console.log('Producto añadido al carrito'); 
  }

  cambiarImagen(url: string) { 
    this.imagenMostrada = url; 
  }
}