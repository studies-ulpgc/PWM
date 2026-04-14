import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  enCesta: boolean = false;
  enDeseados: boolean = false;

  private authSub?: Subscription;

  constructor(private authService: AutentificacionService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  toggleCesta() {
    if (this.isLoggedIn) {
      this.enCesta = !this.enCesta;
    }
  }

  toggleDeseados() {
    if (this.isLoggedIn) {
      this.enDeseados = !this.enDeseados;
    }
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