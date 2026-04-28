import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterDataService } from '../../services/footer-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  idiomas: any[] = [];
  paises: any[] = [];

  constructor(private footerService: FooterDataService) {}

  ngOnInit() {
    this.footerService.getIdiomas().subscribe(data => this.idiomas = data);
    this.footerService.getInternacional().subscribe(data => this.paises = data);
  }
}
