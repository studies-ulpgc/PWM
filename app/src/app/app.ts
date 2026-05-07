import { Component, OnInit } from '@angular/core'; // Añade OnInit
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './services/database.service'; // Importa tu servicio

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que sea standalone
  imports: [IonApp, IonRouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit { // Implementa OnInit
  constructor(private dbService: DatabaseService) {}

  async ngOnInit() {
    try {
      await this.dbService.inicializarDB();
      console.log('Base de datos lista');
    } catch (err) {
      console.error('Error al abrir la DB', err);
    }
  }
}