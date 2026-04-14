import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutentificacionService } from '../../services/autentificacion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comentario.html',
  styleUrls: ['./comentario.css']
})
export class Comentario implements OnInit, OnDestroy {
  @Input() data: any;
  
  isLoggedIn = false;
  liked = false;
  disliked = false;
  private authSub?: Subscription;

  constructor(private authService: AutentificacionService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (!this.isLoggedIn) {
        this.liked = false;
        this.disliked = false;
      }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  obtenerRating(): number {
    if (!this.data?.Valoracion || this.data.Valoracion.length === 0) return 0;
    const nombreArchivo = this.data.Valoracion[0].name;
    const rating = parseInt(nombreArchivo.split('_')[0]);
    return isNaN(rating) ? 0 : rating;
  }

  onLike() {
    if (this.isLoggedIn) {
      this.liked = !this.liked;
      if (this.liked) this.disliked = false;
    }
  }

  onDislike() {
    if (this.isLoggedIn) {
      this.disliked = !this.disliked;
      if (this.disliked) this.liked = false; 
    }
  }
}