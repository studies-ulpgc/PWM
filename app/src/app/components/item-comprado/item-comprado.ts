import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderItem } from '../../pages/lista-pedidos-realizados/order-item.model';

@Component({
  selector: 'app-item-comprado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-comprado.html',
  styleUrls: ['./item-comprado.css']
})
export class ItemComprado {
  @Input() item!: OrderItem;
}