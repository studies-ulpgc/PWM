import { Injectable } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private firestore;

  constructor() {
    if (getApps().length === 0) {
      initializeApp(environment.firebase);
    }
    this.firestore = getFirestore();
  }

  getComentarios(): Observable<any[]> {
    console.log('Cargando comentarios desde Firestore...');
    const comentariosRef = collection(this.firestore, 'comentario');
    return from(getDocs(comentariosRef)).pipe(
      map(snapshot => {
        const comentarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Comentarios cargados:', comentarios);
        return comentarios;
      })
    );
  }
}