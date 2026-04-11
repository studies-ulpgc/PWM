import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-img-izq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contenedor-imagen-lateral" *ngIf="data">
      <img [src]="'assets' + data.url" [alt]="data.name" class="imagen-full">
    </div>
  `,
  styleUrl: './img-izq.css'
})
export class ImgIzq {
  @Input() data: any;
}