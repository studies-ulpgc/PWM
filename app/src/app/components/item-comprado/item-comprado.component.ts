import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderItem } from '../../pages/lista-pedidos-realizados/order-item.model.component';

@Component({
  selector: 'app-item-comprado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-comprado.component.html',
  styleUrls: ['./item-comprado.component.css']
})
export class ItemCompradoComponent {
  @Input() item!: OrderItem;
}
