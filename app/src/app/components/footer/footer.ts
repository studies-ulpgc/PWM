import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './footer.html', // Verifica que el HTML esté en la misma carpeta
  styleUrl: './footer.css',    // Verifica que el CSS esté en la misma carpeta
})
export class Footer implements OnInit {
  idiomas: any[] = [];
  paises: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/json/idiomas.json').subscribe({
      next: (res) => this.idiomas = res.data || [],
      error: (err) => console.error('Error idiomas:', err)
    });
    this.http.get<any>('assets/json/internacional.json').subscribe({
      next: (res) => this.paises = res.data || [],
      error: (err) => console.error('Error países:', err)
    });
  }
}