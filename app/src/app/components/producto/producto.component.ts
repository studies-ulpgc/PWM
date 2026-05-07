import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bagAddOutline, bagCheck, heart, heartOutline } from 'ionicons/icons';
import { AutentificacionService } from '../../services/autentificacion.service';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    IonButton, 
    IonIcon
  ],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, OnDestroy {
  @Input() data: any;
  isLoggedIn = false;
  enCesta = false;
  enDeseados = false;
  private authSub?: Subscription;

  constructor(
    private authService: AutentificacionService, 
    private cdr: ChangeDetectorRef,
    private dbService: DatabaseService, 
    private productoService: ProductoService
  ) {
    // Registramos los iconos de Ionic
    addIcons({ bagAddOutline, bagCheck, heart, heartOutline });
  }

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (!this.isLoggedIn) {
        this.enCesta = false;
        this.enDeseados = false;
      }
      this.cdr.detectChanges();
    });
  }

  toggleCesta() {
    if (this.isLoggedIn) this.enCesta = !this.enCesta;
  }

  async toggleDeseados() {
    if (!this.isLoggedIn) return;
    this.enDeseados = !this.enDeseados;

    if (this.enDeseados) {
      await this.dbService.addDeseado(this.data);
    } else {
      await this.dbService.removeDeseado(this.data.id);
    }
  }

  obtenerRating(): number {
    if (!this.data?.Valoracion || this.data.Valoracion.length === 0) return 0;
    const nombreArchivo = this.data.Valoracion[0].name;
    const rating = parseInt(nombreArchivo.split('_')[0]);
    return isNaN(rating) ? 0 : rating;
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}