import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonGrid, IonRow, IonCol, IonHeader 
} from '@ionic/angular/standalone';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SimilaresComponent } from '../../components/similares/similares.component';
import { ItemWantedComponent } from '../../components/item-wanted/item-wanted.component';
import { WantedItem } from './wanted-item.model.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-lista-deseados',
  standalone: true,
  imports: [
    CommonModule, 
    IonContent, IonGrid, IonRow, IonCol, IonHeader,
    HeaderGrandeComponent, FooterComponent, SimilaresComponent, ItemWantedComponent
  ],
  templateUrl: './lista-deseados.component.html',
  styleUrls: ['./lista-deseados.component.css']
})
export class ListaDeseadosComponent implements OnInit {
  wantedItems: WantedItem[] = [];

  constructor(
    private dbService: DatabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDeseados();
  }

  async cargarDeseados() {
    const itemsLocal = await this.dbService.getDeseados();
    
    this.wantedItems = await Promise.all(itemsLocal.map(async (item: any) => {
      const estaEnCesta = await this.dbService.exists('cesta', item.id.toString());
      
      return {
        id: item.id,
        name: item.nombre,
        price: item.precio,
        img: item.img,
        added: estaEnCesta,
        opts: 'Talla única'
      };
    }));
    
    this.cdr.detectChanges();
  }

  async eliminarDeDeseados(id: string | number) {
    await this.dbService.removeDeseado(id);
    await this.cargarDeseados();
  }
}