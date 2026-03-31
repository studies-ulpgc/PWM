import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCorto } from '../../components/header-corto/header-corto';
import { Footer } from '../../components/footer/footer';
import { Producto } from '../../components/producto/producto';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, HeaderCorto, Footer, Producto],
  templateUrl: './galeria.html'
})
export class Galeria implements OnInit {
  listaProductos: any[] = []; // <--- Declarar la variable

  ngOnInit() { }
}