import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, IonButton, IonIcon, IonLabel, IonImg 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, cartOutline, checkmarkOutline } from 'ionicons/icons';
import { DatabaseService } from '../../services/database.service';
import { WantedItem } from '../../pages/lista-deseados/wanted-item.model.component';

@Component({
  selector: 'app-item-wanted',
  standalone: true,
  imports: [CommonModule, IonCard, IonButton, IonIcon, IonLabel, IonImg],
  templateUrl: './item-wanted.component.html',
  styleUrls: ['./item-wanted.component.css']
})
export class ItemWantedComponent {
  @Input() item!: WantedItem;
  @Output() remove = new EventEmitter<void>();

  constructor(private dbService: DatabaseService) {
    addIcons({ closeOutline, cartOutline, checkmarkOutline });
  }

  async toggleAdd() {
    this.item.added = !this.item.added;

    if (this.item.added) {
      await this.dbService.addCesta({
        id: this.item.id,
        nombre: this.item.name,
        precio: this.item.price,
        img: this.item.img // Asegúrate de que el campo sea 'img' como en tu modelo
      });
    } else {
      await this.dbService.removeCesta(this.item.id);
    }
  }

  onRemove() {
    this.remove.emit();
  }
}