import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { 
  IonContent, IonHeader, IonButton, IonIcon, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';
import { Subscription } from 'rxjs';

import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComentarioComponent } from '../../components/comentario/comentario.component';
import { ProductoService } from '../../services/producto.service';
import { ComentarioService } from '../../services/comentario.service';
import { SimilaresComponent } from '../../components/similares/similares.component';
import { DatabaseService } from '../../services/database.service';
import { AutentificacionService } from '../../services/autentificacion.service';

@Component({
  selector: 'app-articulo-seleccionado',
  standalone: true,
  imports: [
    CommonModule, RouterModule, IonContent, IonHeader, IonButton, IonIcon,
    HeaderGrandeComponent, FooterComponent, ComentarioComponent, SimilaresComponent
  ],
  templateUrl: './articulo-seleccionado.component.html',
  styleUrls: ['./articulo-seleccionado.component.css']
})
export class ArticuloSeleccionadoComponent implements OnInit, OnDestroy {
  producto: any = null;
  listaComentarios: any[] = [];
  productosRelacionados: any[] = [];
  precioEntero: string = '0';
  precioDecimal: string = '00';
  imagenMostrada: string = '';

  isLoggedIn = false;
  enCesta = false;
  enDeseados = false;
  private authSub?: Subscription;
  private refreshSub?: Subscription;

  private toastCtrl = inject(ToastController);

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private comentarioService: ComentarioService,
    private dbService: DatabaseService,
    private authService: AutentificacionService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ heartOutline, heart });
  }

  ngOnInit(): void {
    this.authSub = this.authService.user$.subscribe(async user => {
      this.isLoggedIn = !!user;
      await this.verificarEstadoDB();
    });

    this.refreshSub = this.productoService.refresh$.subscribe(async () => {
      await this.verificarEstadoDB();
    });

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

  async verificarEstadoDB() {
    if (this.isLoggedIn && this.producto?.id) {
      this.enDeseados = await this.dbService.exists('deseados', this.producto.id.toString());
      this.enCesta = await this.dbService.exists('cesta', this.producto.id.toString());
    } else {
      this.enCesta = false;
      this.enDeseados = false;
    }
    this.cdr.detectChanges();
  }

  cargarDatosProducto(id: string) {
    this.producto = null;
    this.productoService.getProductoById(id).subscribe(async p => {
      if (!p) return;

      const fotoUrl = p.Foto?.[0]?.formats?.medium?.url || p.Foto?.[0]?.url || '';
      const precioLimpio = String(p.Precio || '0').replace('€', '').trim();
      const [entero, decimal = '00'] = precioLimpio.split('.');

      this.producto = {
        ...p,
        nombre: p.Descripcion || p.Subtitulo, 
        precio: parseFloat(`${entero}.${decimal}`), 
        fotoUrl: fotoUrl,
        tallasArray: p.Talla?.split(',').map((t: string) => t.trim()) || [],
      };
      
      this.precioEntero = entero;
      this.precioDecimal = (decimal + '00').slice(0, 2);
      this.imagenMostrada = fotoUrl;

      await this.verificarEstadoDB();
      this.cargarRelacionados(p.id);
      this.cdr.detectChanges();
    });
  }

  async toggleCesta() {
    if (!this.isLoggedIn) return;
    this.enCesta = !this.enCesta;

    if (this.enCesta) {
      await this.dbService.addCesta(this.producto);
      const toast = await this.toastCtrl.create({
        message: 'Producto añadido a la cesta',
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      await toast.present();
    } else {
      await this.dbService.removeCesta(this.producto.id);
    }
    this.productoService.notifyUpdate();
  }

  async toggleDeseados() {
    if (!this.isLoggedIn) return;
    this.enDeseados = !this.enDeseados;

    if (this.enDeseados) {
      await this.dbService.addDeseado(this.producto);
    } else {
      await this.dbService.removeDeseado(this.producto.id);
    }
    this.productoService.notifyUpdate();
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
          fotoUrl: fotoUrl
        };
      });

      this.productosRelacionados = Array.from({ length: 4 }, (_, i) => mapeados[i % mapeados.length]);
      this.cdr.detectChanges();
    });
  }

  obtenerRating(producto: any): number {
    if (!producto.Valoracion || producto.Valoracion.length === 0) return 0;
    const nombreArchivo = producto.Valoracion[0].name;
    const rating = parseInt(nombreArchivo.split('_')[0]);
    return isNaN(rating) ? 0 : rating;
  }

  cambiarImagen(miniatura: any) {
    if (miniatura) {
      const url = miniatura.formats?.medium?.url || miniatura.formats?.large?.url || miniatura.url;
      this.imagenMostrada = url || '';
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
    this.refreshSub?.unsubscribe();
  }
}