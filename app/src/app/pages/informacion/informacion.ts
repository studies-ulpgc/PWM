import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformacionService } from '../../services/informacion.service';
import { CommonModule } from '@angular/common';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule, HeaderGrande, Footer],
  templateUrl: './informacion.html',
  styleUrls: ['./informacion.css']
})
export class Informacion implements OnInit {
  // Inicializamos con valores vacíos para evitar errores de renderizado inicial
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
              // El setTimeout(..., 0) soluciona el error NG0100 
              // al mover la actualización al siguiente ciclo de detección
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