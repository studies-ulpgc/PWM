import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productos: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProductos().subscribe(data => {
      this.productos = data.data;
    });
  }
}