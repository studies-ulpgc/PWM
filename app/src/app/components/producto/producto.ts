import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AutentificacionService } from '../../services/autentificacion.service'; // Ajusta la ruta
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class Producto implements OnInit, OnDestroy {
  @Input() data: any;
  isLoggedIn = false;
  private authSub?: Subscription;

  constructor(private authService: AutentificacionService) {}

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  obtenerRating(): number {
    if (!this.data?.Valoracion || this.data.Valoracion.length === 0) return 0;
    const nombreArchivo = this.data.Valoracion[0].name; 
    const rating = parseInt(nombreArchivo.split('_')[0]);
    return isNaN(rating) ? 0 : rating;
  }
}