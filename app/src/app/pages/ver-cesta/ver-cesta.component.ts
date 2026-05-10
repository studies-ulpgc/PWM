import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Importaciones de Ionic Standalone
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonCard } from '@ionic/angular/standalone';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { SimilaresComponent } from '../../components/similares/similares.component';
import { ProductoService } from '../../services/producto.service';
import { CartItem } from './cart-item.model.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-ver-cesta',
  standalone: true,
  // Actualizamos los imports con los componentes de Ionic
  imports: [
    CommonModule, 
    IonContent, IonGrid, IonRow, IonCol, IonButton, IonCard,
    HeaderGrandeComponent, FooterComponent, ItemCardComponent, SimilaresComponent
  ],
  templateUrl: './ver-cesta.component.html',
  styleUrls: ['./ver-cesta.component.css']
})
export class VerCestaComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef,
    private dbService: DatabaseService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCesta();
  }

  async cargarCesta() {
    const itemsLocal = await this.dbService.getCesta();
    this.cartItems = itemsLocal.map((item: any) => ({
      id: item.id,
      name: item.nombre,
      price: item.precio,
      img: item.img,
      selected: true,
      opts: 'Talla única · Color: Estándar'
    }));
    this.updateTotal();
  }

  async eliminarDelCarrito(id: any) {
    await this.dbService.removeCesta(id);
    this.productoService.notifyUpdate();
    await this.cargarCesta();
  }

  updateTotal() {
    this.total = this.cartItems
      .filter(item => item.selected)
      .reduce((acc, item) => acc + item.price, 0);
    this.cdr.detectChanges();
  }

  irAPagar() {
    this.router.navigate(['/pagar']);
  }
}