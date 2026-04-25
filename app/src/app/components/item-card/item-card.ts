import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../pages/ver-cesta/cart-item.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCard {
  @Input() item!: CartItem;
  @Output() selectionChange = new EventEmitter<void>();

  onToggle() {
    this.item.selected = !this.item.selected;
    this.selectionChange.emit();
  }
}