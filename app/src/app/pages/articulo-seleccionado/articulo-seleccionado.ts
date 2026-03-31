import { Component, OnInit } from '@angular/core'; // <--- Faltaba importar esto
import { CommonModule } from '@angular/common';
import { HeaderCorto } from '../../components/header-corto/header-corto';
import { Footer } from '../../components/footer/footer';
import { Comentario } from '../../components/comentario/comentario';
import { Producto } from '../../components/producto/producto';

@Component({
  selector: 'app-articulo-seleccionado',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderCorto, 
    Footer, 
    Comentario, 
    Producto
  ],
  templateUrl: './articulo-seleccionado.html',
  styleUrls: ['./articulo-seleccionado.css']
})
export class ArticuloSeleccionado implements OnInit {
  // Variables que usa el HTML
  producto: any = null; 
  listaComentarios: any[] = [];
  productosRelacionados: any[] = [];
  precioEntero: string = '0';
  precioDecimal: string = '00';
  imagenMostrada: string = '';

  constructor() { } // <--- No pongas "...", déjalo vacío si no inyectas nada todavía

  ngOnInit(): void {
    // Aquí irá la lógica de carga más adelante
    console.log('Componente cargado');
  }
  
  agregarAlCarrito() { 
    console.log('Producto añadido al carrito'); 
  }

  cambiarImagen(url: string) { 
    this.imagenMostrada = url; 
  }
}