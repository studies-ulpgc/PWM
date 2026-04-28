import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Subscription, switchMap, of, catchError } from 'rxjs';
import { AutentificacionService } from '../../services/autentificacion.service';

@Component({
  selector: 'app-ver-cuenta',
  imports: [CommonModule, RouterLink, RouterModule, HeaderGrandeComponent, FooterComponent],
  templateUrl: './ver-cuenta.component.html',
  styleUrl: './ver-cuenta.component.css',
})
export class VerCuentaComponent implements OnInit, OnDestroy {
  userName: string = 'Cargando...';
  private sub?: Subscription;

  constructor(
    private authService: AutentificacionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.authService.getDatosUsuario(user.uid).pipe(
            catchError(err => {
              console.error('Error:', err);
              return of({ nombre: 'Usuario', apellidos: '' });
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe(datos => {
      if (datos) {
        this.userName = `${datos.nombre} ${datos.apellidos}`.trim();
      } else {
        this.userName = 'Invitado';
      }

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ropaOpciones = ['Mujer', 'Hombre', 'Niño', 'Niña', 'Otro'];
  quienOpciones = ['Familia', 'Amigos', 'Pareja', 'Hijos', 'Mi'];

  stats = [
    { cifra: 3, etiqueta: 'Cupones' },
    { cifra: 3, etiqueta: 'Puntos' },
    { cifra: 3, etiqueta: 'Tarjeta Regalo' }
  ];
}

