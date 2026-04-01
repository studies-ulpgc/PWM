import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el pipe de decimales o si usas @if
import { RouterLink } from '@angular/router'; // <--- ESTA ES LA CLAVE

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class Producto {
  @Input() data: any;
}