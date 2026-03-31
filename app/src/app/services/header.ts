import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: '../components/header-grande/header-grande.html',
  styleUrls: ['../components/header-grande/header-grande.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName = 'Usuario';
  showUserPopup = false;
  showCategorias = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.userName = sessionStorage.getItem('userName') || 'Usuario';
    }
  }

  toggleUserPopup() {
    if (this.isLoggedIn) {
      this.showUserPopup = !this.showUserPopup;
    } else {
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  logout() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}