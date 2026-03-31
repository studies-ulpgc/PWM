import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto';
import { CommonModule } from '@angular/common'; // Importante para usar @for o *ngFor

@Component({
  selector: 'app-home',
  standalone: true, // Si usas Angular moderno
  imports: [CommonModule], // Para que reconozca las directivas en el HTML
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }
}