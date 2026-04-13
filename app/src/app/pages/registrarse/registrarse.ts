import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ImgIzq } from '../../components/img-izq/img-izq';
import { Router, RouterLink } from '@angular/router';
import { ImagenIzqService } from '../../services/imagen-izq.service';
import { AutentificacionService } from '../../services/autentificacion.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImgIzq, RouterLink],
  templateUrl: './registrarse.html',
  styleUrl: './registrarse.css',
})
export class Registrarse implements OnInit {
  registerForm!: FormGroup;
  datosImagen: any;
  verPass: boolean = false;
  verConfirmPass: boolean = false;

  constructor(
    private fb: FormBuilder,
    private imgService: ImagenIzqService,
    private cdr: ChangeDetectorRef,
    private authService: AutentificacionService,
    private router: Router
  ) {}

  ngOnInit() {
    const soloLetrasPattern = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.pattern(emailPattern)
      ]],
      nombre: ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
      apellidos: ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
      fecha: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.imgService.getImagenConfig().subscribe(res => {
      this.datosImagen = res;
      this.cdr.detectChanges();
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password');
    const confirmPass = control.get('confirmPassword');
    return pass && confirmPass && pass.value !== confirmPass.value ? { noMatch: true } : null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.registrarse(this.registerForm.value)
        .then(response => {
          console.log('Usuario creado con éxito:', response);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('Error en el registro:', error);
        });
    }
  }
}
