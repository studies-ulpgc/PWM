import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Para el [routerLink]
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Producto } from '../../components/producto/producto';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderGrande, Footer, Producto],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  carruselItems: any[] = [];
  productos: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProductos().subscribe((data: any) => {
      if (data && data.data) {
        this.productos = data.data;
        // Los primeros 3 productos como carrusel
        this.carruselItems = data.data.slice(0, 3);
      }
    });
  }
}