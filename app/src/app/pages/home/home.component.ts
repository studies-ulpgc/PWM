import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Importa los componentes de Ionic Standalone
import { IonContent, IonHeader } from '@ionic/angular/standalone'; 
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductoComponent } from '../../components/producto/producto.component';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  // Añade IonContent aquí
  imports: [CommonModule, IonHeader, RouterModule, IonContent, HeaderGrandeComponent, FooterComponent, ProductoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carruselItems: any[] = [];
  productos: any[] = [];

  constructor(private router: Router, private productoService: ProductoService, private cdr: ChangeDetectorRef) {}

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

      this.productos = Array(1).fill(mapped).flat();
      this.carruselItems = [...mapped.slice(0, 3), ...mapped.slice(0, 3)];

      this.cdr.detectChanges();
    }, err => console.error('Error al cargar productos', err));
  }

  trackById(index: number, item: any) {
    return item?.id || index;
  }

  navegar(id: string) {
    if (id) {
      this.router.navigate(['/articulo-seleccionado', id]);
    }
  }
}
