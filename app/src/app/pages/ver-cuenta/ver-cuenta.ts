import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';
import { Subscription, switchMap, of, catchError } from 'rxjs';
import { AutentificacionService } from '../../services/autentificacion.service';

@Component({
  selector: 'app-ver-cuenta',
  imports: [CommonModule, RouterLink, HeaderGrande, Footer],
  templateUrl: './ver-cuenta.html',
  styleUrl: './ver-cuenta.css',
})
export class VerCuenta implements OnInit, OnDestroy {
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

