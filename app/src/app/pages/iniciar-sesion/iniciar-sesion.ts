import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ImgIzq } from '../../components/img-izq/img-izq';
import { ImagenIzqService } from '../../services/imagen-izq.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImgIzq], 
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export class IniciarSesion implements OnInit {
  loginForm!: FormGroup;
  datosImagen: any;
  verContrasena: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private imgService: ImagenIzqService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.imgService.getImagenConfig().subscribe(res => {
      this.datosImagen = res;
    });
  }

  togglePassword(): void {
    this.verContrasena = !this.verContrasena;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Datos enviados:", this.loginForm.value);
    }
  }
}