import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html'
})
export class FooterComponent implements OnInit {
  idiomas: any[] = [];
  paises: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Cargamos idiomas
    this.http.get<any>('assets/json/idiomas.json').subscribe(res => {
      this.idiomas = res.data;
    });
    // Cargamos países
    this.http.get<any>('assets/json/internacional.json').subscribe(res => {
      this.paises = res.data;
    });
  }
}