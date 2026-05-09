import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
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
  @Output() remove = new EventEmitter<void>(); // Evento para borrar de la lista

  constructor(private dbService: DatabaseService) {}

  async toggleAdd() {
    this.item.added = !this.item.added;

    if (this.item.added) {
      // Si el botón cambia a "Añadido", lo guardamos en la tabla cesta
      await this.dbService.addCesta({
        id: this.item.id,
        nombre: this.item.name,
        precio: this.item.price,
        fotoUrl: this.item.img
      });
    } else {
      // Si lo desmarcamos, lo quitamos de la cesta
      await this.dbService.removeCesta(this.item.id);
    }
  }

  onRemove() {
    this.remove.emit(); // Avisamos al padre para que ejecute el DELETE
  }
}