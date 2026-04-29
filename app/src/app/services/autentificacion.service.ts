import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core'; // Añadido inject e Injector
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private injector = inject(Injector); 

  user$: Observable<any>;

  constructor() {
    this.user$ = authState(this.auth);
  }

  async registrarse(datos: any) {
    const { email, password, nombre, apellidos, fecha } = datos;
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const userDocRef = doc(this.firestore, `usuarios/${userCredential.user.uid}`);
    
    return setDoc(userDocRef, {
      nombre,
      apellidos,
      fechaNacimiento: fecha,
      email: email
    });
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async loginConGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    const res = await signInWithPopup(this.auth, provider);
    const user = res.user;

    const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
    await setDoc(userDocRef, {
      nombre: user.displayName?.split(' ')[0] || '',
      apellidos: user.displayName?.split(' ').slice(1).join(' ') || '',
      email: user.email,
      rol: 'usuario'
    }, { merge: true });

    return res;
  }

  getDatosUsuario(uid: string): Observable<any> {
    if (!uid) return of(null);

    return runInInjectionContext(this.injector, () => {
      const userDocRef = doc(this.firestore, 'usuarios', uid);
      return from(getDoc(userDocRef)).pipe(
        map(snapshot => snapshot.exists() ? snapshot.data() : null)
      );
    });
  }
}