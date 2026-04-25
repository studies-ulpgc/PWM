import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Similares } from '../../components/similares/similares';
import { ItemWanted } from '../../components/item-wanted/item-wanted';
import { ProductoService } from '../../services/producto.service';
import { WantedItem } from './wanted-item.model';

@Component({
  selector: 'app-lista-deseados',
  standalone: true,
  imports: [CommonModule, HeaderGrande, Footer, Similares, ItemWanted],
  templateUrl: './lista-deseados.html',
  styleUrls: ['./lista-deseados.css']
})
export class ListaDeseados implements OnInit {
  wantedItems: WantedItem[] = [];

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this.productoService.getProductos().subscribe(data => {
    const itemsRaw = data || [];
    
    // Generamos 8 items para forzar el scroll
    this.wantedItems = Array.from({ length: 8 }, (_, i) => {
      const producto = itemsRaw[i % itemsRaw.length];
      return {
        id: i + 1,
        name: producto?.Descripcion || 'Artículo de Tendencia',
        price: parseFloat(producto?.Precio) || 29.99,
        added: false,
        img: producto?.Foto?.[0]?.url ? 'assets' + producto.Foto[0].url : '',
        opts: `Talla: L · Color: Negro`
      };
    });

    this.cdr.detectChanges();
  });
}
}