import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentario.html',
  styleUrl: './comentario.css'
})
export class Comentario {
  @Input() data: any; // <--- ESTO ES LO QUE FALTA
}