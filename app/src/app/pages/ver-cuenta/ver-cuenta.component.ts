import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Subscription, switchMap, of, catchError } from 'rxjs';
import { AutentificacionService } from '../../services/autentificacion.service';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { 
  IonContent, IonHeader, IonSpinner, IonGrid, IonRow, IonCol, 
  IonButton, IonIcon, IonChip, IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ver-cuenta',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterModule, HeaderGrandeComponent, FooterComponent, 
    IonContent, IonHeader, IonSpinner, IonGrid, IonRow, IonCol, 
    IonButton, IonIcon, IonChip, IonLabel
  ],
  templateUrl: './ver-cuenta.component.html',
  styleUrl: './ver-cuenta.component.css',
})
export class VerCuentaComponent implements OnInit, OnDestroy {
  userName: string = 'Cargando...';
  uidUsuario: string | null = null;
  fotoPerfil: string = 'https://ui-avatars.com/api/?name=Usuario&background=random';
  subiendoImagen: boolean = false;
  
  private sub?: Subscription;
  private firestore: Firestore = inject(Firestore);

  ropaOpciones = ['Mujer', 'Hombre', 'Niño', 'Niña', 'Otro'];
  quienOpciones = ['Familia', 'Amigos', 'Pareja', 'Hijos', 'Mi'];
  stats = [
    { cifra: 3, etiqueta: 'Cupones' },
    { cifra: 3, etiqueta: 'Puntos' },
    { cifra: 3, etiqueta: 'Tarjeta Regalo' }
  ];

  constructor(
    private authService: AutentificacionService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ cameraOutline, createOutline });
  }

  ngOnInit() {
    this.sub = this.authService.user$.pipe(
      switchMap(user => {
        if (user) {
          this.uidUsuario = user.uid;
          return this.authService.getDatosUsuario(user.uid).pipe(
            catchError(err => {
              console.error('Error:', err);
              return of({ nombre: 'Usuario', apellidos: '' });
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe(datos => {
      if (datos) {
        this.userName = `${datos.nombre} ${datos.apellidos}`.trim();
        this.fotoPerfil = datos.fotoPerfil || `https://ui-avatars.com/api/?name=${datos.nombre}+${datos.apellidos}&background=random&color=fff`;
      } else {
        this.userName = 'Invitado';
      }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.subiendoImagen = true;
    this.cdr.detectChanges();

    try {
      const urlCloudinary = await this.subirACloudinary(file);
      if (this.uidUsuario && urlCloudinary) {
        await this.guardarEnFirebase(urlCloudinary);
        this.fotoPerfil = urlCloudinary;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al cambiar tu foto de perfil.');
    } finally {
      this.subiendoImagen = false;
      this.cdr.detectChanges();
    }
  }

  async subirACloudinary(file: File): Promise<string> {
    const cloudName = 'dxndjdzaq';
    const uploadPreset = 'perfil_usuarios';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return data.secure_url;
  }

  async guardarEnFirebase(url: string) {
    if (!this.uidUsuario) return;
    const userRef = doc(this.firestore, `usuarios/${this.uidUsuario}`);
    await updateDoc(userRef, { fotoPerfil: url });
  }
}