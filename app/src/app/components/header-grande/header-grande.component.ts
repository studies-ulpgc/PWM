import { Component, HostListener, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutentificacionService } from '../../services/autentificacion.service';
import { catchError, Subscription, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-header-grande',
  standalone: true,
  templateUrl: './header-grande.component.html',
  styleUrls: ['./header-grande.component.css'],
  imports: [FormsModule, RouterModule, CommonModule],
})
export class HeaderGrandeComponent implements OnInit, OnDestroy{
  mostrarPopup = false;
  query = '';
  isLoggedIn = false;
  userName = 'Usuario';
  private authSub?: Subscription;

  constructor(private router: Router, private authService: AutentificacionService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.authSub = this.authService.user$.pipe(
      switchMap(user => {
        if (user) {
          this.isLoggedIn = true;
          return this.authService.getDatosUsuario(user.uid).pipe(
            catchError(err => {
              console.error('Error en Header Firestore:', err);
              return of({ nombre: user.email?.split('@')[0] || 'Usuario' });
            })
          );
        } else {
          this.isLoggedIn = false;
          return of(null);
        }
      })
    ).subscribe(datos => {
      if (datos) {
        this.userName = datos.nombre || 'Usuario';
      } else {
        this.userName = 'Usuario';
      }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  get isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  onAuthClick(event: Event) {
    event.stopPropagation();
    if (!this.isLoggedIn) {
      this.router.navigate(['/iniciar-sesion']);
      return;
    }
    this.mostrarPopup = !this.mostrarPopup;
  }

  irACesta() {
    this.router.navigate([this.isLoggedIn ? '/ver-cesta' : '/iniciar-sesion']);
  }

  irADeseados() {
    this.router.navigate([this.isLoggedIn ? '/lista-deseados' : '/iniciar-sesion']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.mostrarPopup = false;
      this.router.navigate(['/home']);
    });
  }

  buscar(event: Event) {
    event.preventDefault();
    this.router.navigate(['/galeria'], { queryParams: { query: this.query } });
  }

  @HostListener('document:click')
  cerrarPopup() {
    this.mostrarPopup = false;
  }
}
