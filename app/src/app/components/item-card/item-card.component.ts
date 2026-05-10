import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../pages/ver-cesta/cart-item.model.component';
// Importaciones de Ionic
import { IonCheckbox, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, IonCheckbox, IonButton, IonIcon],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  @Input() item!: CartItem;
  @Output() selectionChange = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<string | number>();

  constructor() {
    addIcons({ trashOutline });
  }

  onToggle() {
    this.item.selected = !this.item.selected;
    this.selectionChange.emit();
  }

  onDelete() {
    this.deleteItem.emit(this.item.id);
  }
}