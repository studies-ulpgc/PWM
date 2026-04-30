import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SimilaresComponent } from '../../components/similares/similares.component';
import { ItemWantedComponent } from '../../components/item-wanted/item-wanted.component';
import { ProductoService } from '../../services/producto.service';
import { WantedItem } from './wanted-item.model.component';

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
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this.productoService.getProductos().subscribe(data => {
    const itemsRaw = data || [];

    this.wantedItems = Array.from({ length: 8 }, (_, i) => {
      const producto = itemsRaw[i % itemsRaw.length];
      return {
        id: i + 1,
        name: producto?.Descripcion || 'Artículo de Tendencia',
        price: parseFloat(producto?.Precio) || 29.99,
        added: false,
        img: producto?.Foto?.[0]?.url ?  producto.Foto[0].url : '',
        opts: `Talla: L · Color: Negro`
      };
    });

    this.cdr.detectChanges();
  });
}
}
