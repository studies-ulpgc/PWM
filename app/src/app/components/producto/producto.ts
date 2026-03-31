import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el pipe de decimales o si usas @if
import { RouterLink } from '@angular/router'; // <--- ESTA ES LA CLAVE

@Component({
  selector: 'app-producto',
  standalone: true,
  // Aquí es donde le damos permiso al HTML para usar routerLink
  imports: [CommonModule, RouterLink], 
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class Producto {
  @Input() data: any;

  // No olvides declarar también las funciones que pusimos en el HTML
  // para que no te de el error de "Property does not exist"
  agregarAlCarrito(event: Event) {
    event.stopPropagation(); // Evita que al hacer clic se abra el producto
    console.log('Añadido al carrito:', this.data?.nombre);
  }

  agregarADeseados(event: Event) {
    event.stopPropagation();
    console.log('Añadido a deseados:', this.data?.nombre);
  }
}