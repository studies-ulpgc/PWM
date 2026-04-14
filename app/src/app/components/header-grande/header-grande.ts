import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutentificacionService } from '../../services/autentificacion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-grande',
  standalone: true,
  templateUrl: './header-grande.html',
  styleUrls: ['./header-grande.css'],
  imports: [FormsModule, RouterModule, CommonModule],
})
export class HeaderGrande implements OnInit, OnDestroy{
  mostrarPopup = false;
  query = '';
  isLoggedIn = false;
  userName = 'Usuario';
  private authSub?: Subscription;

  constructor(private router: Router, private authService: AutentificacionService) {}

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.displayName || user.email?.split('@')[0] || 'Usuario';
      } else {
        this.isLoggedIn = false;
        this.userName = 'Usuario';
      }
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
    this.router.navigate([this.isLoggedIn ? '/cesta' : '/login']);
  }

  irADeseados() {
    this.router.navigate([this.isLoggedIn ? '/deseados' : '/login']);
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