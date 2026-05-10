import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonHeader, IonItem
} from '@ionic/angular/standalone';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SimilaresComponent } from '../../components/similares/similares.component';
import { ItemCompradoComponent } from '../../components/item-comprado/item-comprado.component';
import { ProductoService } from '../../services/producto.service';
import { OrderItem } from './order-item.model.component';

@Component({
  selector: 'app-lista-pedidos-realizados',
  standalone: true,
  imports: [
    CommonModule, FormsModule, 
    IonContent, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonHeader, IonItem,
    HeaderGrandeComponent, FooterComponent, SimilaresComponent, ItemCompradoComponent
  ],
  templateUrl: './lista-pedidos-realizados.component.html',
  styleUrls: ['./lista-pedidos-realizados.component.css']
})
export class ListaPedidosRealizadosComponent implements OnInit {
  allOrders: OrderItem[] = [];
  filteredOrders: OrderItem[] = [];
  filterStatus: string = 'Todos';

  constructor(private productoService: ProductoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const statuses: ('En envío' | 'En ruta de entrega' | 'Entregado')[] = ['En envío', 'En ruta de entrega', 'Entregado'];

    this.productoService.getProductos().subscribe(data => {
      this.allOrders = data.slice(0, 6).map((p: any, i: number) => ({
        id: i,
        name: p.Descripcion || 'Producto comprado',
        opts: 'Talla: M · Color: Negro',
        price: parseFloat(p.Precio?.replace(/[^0-9.,]/g, '').replace(',', '.') || '0'),
        img: p.Foto?.[0]?.url ?  p.Foto[0].url : '',
        status: statuses[i % 3],
        selected: true
      }));
      this.applyFilter();
    });
  }

  // Ahora se llamará con (ionChange) desde el HTML
  applyFilter() {
    if (this.filterStatus === 'Todos') {
      this.filteredOrders = [...this.allOrders];
    } else {
      this.filteredOrders = this.allOrders.filter(o => o.status === this.filterStatus);
    }
    this.cdr.detectChanges();
  }
}