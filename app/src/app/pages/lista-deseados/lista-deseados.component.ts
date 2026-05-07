import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SimilaresComponent } from '../../components/similares/similares.component';
import { ItemWantedComponent } from '../../components/item-wanted/item-wanted.component';
import { ProductoService } from '../../services/producto.service';
import { WantedItem } from './wanted-item.model.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-lista-deseados',
  standalone: true,
  imports: [CommonModule, HeaderGrandeComponent, FooterComponent, SimilaresComponent, ItemWantedComponent],
  templateUrl: './lista-deseados.component.html',
  styleUrls: ['./lista-deseados.component.css']
})
export class ListaDeseadosComponent implements OnInit {
  wantedItems: WantedItem[] = [];

  constructor(
    private dbService: DatabaseService,
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 3. Usamos "any[]" para que no se queje del tipo de datos
    this.dbService.getDeseados().then((itemsLocal: any[]) => {
      this.wantedItems = itemsLocal.map((item: any) => ({
        id: item.id,
        name: item.nombre,
        price: item.precio,
        img: item.img,
        added: true,
        opts: 'Talla única'
      }));
      this.cdr.detectChanges();
    });
  }
}
