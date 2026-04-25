import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { ItemCard } from '../../components/item-card/item-card';
import { Similares } from '../../components/similares/similares';
import { ProductoService } from '../../services/producto.service';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-ver-cesta',
  standalone: true,
  imports: [CommonModule, HeaderGrande, Footer, ItemCard, Similares],
  templateUrl: './ver-cesta.html',
  styleUrls: ['./ver-cesta.css']
})
export class VerCesta implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCesta();
  }

  cargarCesta() {
    this.productoService.getProductos().subscribe(data => {
      const itemsRaw = data || [];
      
      this.cartItems = Array.from({ length: 6 }, (_, i) => {
        const producto = itemsRaw[i % itemsRaw.length];
        return {
          id: i + 1,
          name: producto?.Descripcion || 'Sin nombre',
          price: parseFloat(producto?.Precio) || 0,
          selected: true,
          img: producto?.Foto?.[0]?.url ? 'assets' + producto.Foto[0].url : '',
          opts: `Talla: ${this.getRandomSize(producto?.Talla)} · Color: ${this.getRandomColor()}`
        };
      });
      
      this.updateTotal();
    });
  }

  updateTotal() {
    this.total = this.cartItems
      .filter(item => item.selected)
      .reduce((acc, item) => acc + item.price, 0);
    this.cdr.detectChanges();
  }

  irAPagar() {
    this.router.navigate(['/pagar']);
  }

  private getRandomSize(tallasStr: string): string {
    if (!tallasStr) return 'M';
    const list = tallasStr.split(',').map(t => t.trim());
    return list[Math.floor(Math.random() * list.length)];
  }

  private getRandomColor(): string {
    const colors = ["Negro", "Blanco", "Azul", "Gris", "Verde"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}