import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.html',
  styleUrls: ['./comentario.css']
})
export class Comentario {
  @Input() data: any;

  onLike() {
    console.log('Like presionado');
  }

  onDislike() {
    console.log('Dislike presionado');
  }
}