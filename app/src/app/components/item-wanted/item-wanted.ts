import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WantedItem } from '../../pages/lista-deseados/wanted-item.model';

@Component({
  selector: 'app-item-wanted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-wanted.html',
  styleUrls: ['./item-wanted.css']
})
export class ItemWanted {
  @Input() item!: WantedItem;

  toggleAdd() {
    this.item.added = !this.item.added;
  }
}