import { Component, Input } from '@angular/core'; // <--- Importante: Input
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class Producto {
  @Input() data: any; // <--- ESTO ES LO QUE FALTA
}