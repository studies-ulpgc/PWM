import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenIzqService } from '../../services/imagen-izq.service';

@Component({
  selector: 'app-img-izq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contenedor-imagen-lateral" *ngIf="data">
      <img [src]="'assets' + data.url" [alt]="data.name" class="imagen-full">
    </div>
  `,
  styles: [`
    .contenedor-imagen-lateral { width: 100%; height: 100%; overflow: hidden; }
    .imagen-full { width: 100%; height: 100%; object-fit: cover; }
  `]
})
export class ImgIzqComponent implements OnInit {
  data: any;

  constructor(
    private imgService: ImagenIzqService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.imgService.getImagenConfig().subscribe({
      next: (res) => {
        console.log('Imagen recibida de Firebase:', res);
        this.data = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando imagen lateral:', err)
    });
  }
}
