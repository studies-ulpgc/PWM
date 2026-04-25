import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Similares } from '../../components/similares/similares';
import { ItemComprado } from '../../components/item-comprado/item-comprado';
import { ProductoService } from '../../services/producto.service';
import { OrderItem } from './order-item.model';

@Component({
  selector: 'app-lista-pedidos-realizados',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderGrande, Footer, Similares, ItemComprado],
  templateUrl: './lista-pedidos-realizados.html',
  styleUrls: ['./lista-pedidos-realizados.css']
})
export class ListaPedidosRealizados implements OnInit {
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
        img: p.Foto?.[0]?.url ? 'assets' + p.Foto[0].url : '',
        status: statuses[i % 3],
        selected: true
      }));
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.filterStatus === 'Todos') {
      this.filteredOrders = [...this.allOrders];
    } else {
      this.filteredOrders = this.allOrders.filter(o => o.status === this.filterStatus);
    }
    this.cdr.detectChanges();
  }
}