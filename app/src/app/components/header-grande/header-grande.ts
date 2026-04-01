import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-grande',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header-grande.html',
  styleUrls: ['./header-grande.css']
})
export class HeaderGrande {

  mostrarPopup = false;
  query = '';

  constructor(private router: Router) {}

  // 🔐 estado login
  get isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  get userName(): string {
    return sessionStorage.getItem('userName') || 'Usuario';
  }

  // 👤 click usuario
  onAuthClick(event: Event) {
    event.stopPropagation();

    if (this.isLoggedIn) {
      this.mostrarPopup = !this.mostrarPopup;
    } else {
      this.router.navigate(['/login']);
    }
  }

  // 🛒 cesta
  irACesta() {
    if (this.isLoggedIn) {
      this.router.navigate(['/cesta']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // ❤️ deseados
  irADeseados() {
    if (this.isLoggedIn) {
      this.router.navigate(['/deseados']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // 🔓 logout
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

  // 🔍 buscar
  buscar(event: Event) {
    event.preventDefault();
    this.router.navigate(['/galeria'], { queryParams: { query: this.query } });
  }

  // 👇 click fuera (sustituye document.addEventListener)
  @HostListener('document:click')
  cerrarPopup() {
    this.mostrarPopup = false;
  }
}