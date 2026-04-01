import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-grande',
  standalone: true,
  templateUrl: './header-grande.html',
  styleUrls: ['./header-grande.css'],
  imports: [FormsModule, RouterModule],
})
export class HeaderGrande {

  mostrarPopup = false;
  query = '';

  constructor(private router: Router) {}

  get isBrowser(): boolean {
  return typeof window !== 'undefined';
}

get isLoggedIn(): boolean {
  if (!this.isBrowser) return false;
  return sessionStorage.getItem('isLoggedIn') === 'true';
}

get userName(): string {
  if (!this.isBrowser) return 'Usuario';
  return sessionStorage.getItem('userName') || 'Usuario';
}

  onAuthClick(event: Event) {
    event.stopPropagation();

    if (this.isLoggedIn) {
      this.mostrarPopup = !this.mostrarPopup;
    } else {
      this.router.navigate(['/login']);
    }
  }

  irACesta() {
    if (this.isLoggedIn) {
      this.router.navigate(['/cesta']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  irADeseados() {
    if (this.isLoggedIn) {
      this.router.navigate(['/deseados']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
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