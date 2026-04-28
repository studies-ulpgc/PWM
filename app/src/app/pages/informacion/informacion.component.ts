import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformacionService } from '../../services/informacion.service';
import { CommonModule } from '@angular/common';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule, HeaderGrandeComponent, FooterComponent],
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  contenido: any[] = [];
  tituloPagina: string = '';

  private route = inject(ActivatedRoute);
  private infoService = inject(InformacionService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.infoService.getInformacionPorId(id).subscribe({
          next: (res) => {
            if (res) {
              setTimeout(() => {
                this.contenido = res.Contenido || [];
                this.tituloPagina = res.titulo_pagina || '';
                this.cdr.detectChanges();
              }, 0);
            }
          },
          error: (err) => console.error("Error en Firebase:", err)
        });
      }
    });
  }
}
