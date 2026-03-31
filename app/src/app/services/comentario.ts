import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comentario',
  templateUrl: '../components/comentario/comentario.html',
})
export class ComentarioComponent {
  // Este objeto 'data' vendrá del bucle @for en el padre
  @Input() data: any;

  formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-ES');
  }
}