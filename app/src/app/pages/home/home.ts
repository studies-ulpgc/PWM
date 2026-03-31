import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Para el [routerLink]
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Producto } from '../../components/producto/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderGrande, Footer, Producto],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  carruselItems: any[] = []; // <--- Declarar esto
  productos: any[] = [];     // <--- Declarar esto

  ngOnInit() { }
}