import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.html',
  styleUrls: ['./comentario.css']
})
export class Comentario {
  @Input() data: any;

  obtenerRating(): number {
    if (!this.data?.Valoracion || this.data.Valoracion.length === 0) return 0;
    
    const nombreArchivo = this.data.Valoracion[0].name;
    const rating = parseInt(nombreArchivo.split('_')[0]);
    
    return isNaN(rating) ? 0 : rating;
  }

  onLike() {
    console.log('Like presionado');
  }

  onDislike() {
    console.log('Dislike presionado');
  }
}