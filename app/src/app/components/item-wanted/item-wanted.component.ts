import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WantedItem } from '../../pages/lista-deseados/wanted-item.model.component';

@Component({
  selector: 'app-item-wanted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-wanted.component.html',
  styleUrls: ['./item-wanted.component.css']
})
export class ItemWantedComponent {
  @Input() item!: WantedItem;

  toggleAdd() {
    this.item.added = !this.item.added;
  }
}
