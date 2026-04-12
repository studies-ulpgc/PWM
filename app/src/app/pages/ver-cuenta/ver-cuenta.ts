import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-ver-cuenta',
  imports: [CommonModule, RouterLink, HeaderGrande, Footer],
  templateUrl: './ver-cuenta.html',
  styleUrl: './ver-cuenta.css',
})
export class VerCuenta {
  userName: string = 'Nombre cuenta';

  ropaOpciones = ['Mujer', 'Hombre', 'Niño', 'Niña', 'Otro'];
  quienOpciones = ['Familia', 'Amigos', 'Pareja', 'Hijos', 'Mi'];

  stats = [
    { cifra: 3, etiqueta: 'Cupones' },
    { cifra: 3, etiqueta: 'Puntos' },
    { cifra: 3, etiqueta: 'Tarjeta Regalo' }
  ];
}
