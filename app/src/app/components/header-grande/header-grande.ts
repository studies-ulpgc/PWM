import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importante para [class.show]

@Component({
  selector: 'app-header-grande',
  standalone: true,
  templateUrl: './header-grande.html',
  styleUrls: ['./header-grande.css'],
  imports: [FormsModule, RouterModule, CommonModule],
})
export class HeaderGrande {
  mostrarPopup = false;
  query = ''; // Esta es la variable que usa [(ngModel)]="query"

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
    this.mostrarPopup = !this.mostrarPopup; 
  }

  irACesta() {
    this.router.navigate([this.isLoggedIn ? '/cesta' : '/login']);
  }

  irADeseados() {
    this.router.navigate([this.isLoggedIn ? '/deseados' : '/login']);
  }

  logout() {
    if (this.isBrowser) {
      sessionStorage.clear();
    }
    this.mostrarPopup = false;
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