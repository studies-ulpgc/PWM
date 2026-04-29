import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore'; // Importa desde @angular/fire
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  getComentarios(): Observable<any[]> {
    console.log('Cargando comentarios desde Firestore...');
    
    return runInInjectionContext(this.injector, () => {
      const comentariosRef = collection(this.firestore, 'comentario');
      return from(getDocs(comentariosRef)).pipe(
        map(snapshot => {
          const comentarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return comentarios;
        })
      );
    });
  }
}