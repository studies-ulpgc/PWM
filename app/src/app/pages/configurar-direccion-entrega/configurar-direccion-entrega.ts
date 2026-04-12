import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImgIzq } from '../../components/img-izq/img-izq';
import { ImagenIzqService } from '../../services/imagen-izq.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-configurar-direccion-entrega',
  imports: [CommonModule, ReactiveFormsModule, ImgIzq, RouterModule],
  templateUrl: './configurar-direccion-entrega.html',
  styleUrl: './configurar-direccion-entrega.css',
})
export class ConfigurarDireccionEntrega implements OnInit {
  direccionForm!: FormGroup;
  datosImagen: any;

  regexCalle = /^.+ - [0-9]+$/;
  regexCP = /^[0-9]{5}$/;
  regexLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;
  regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(
    private fb: FormBuilder,
    private imgService: ImagenIzqService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.direccionForm = this.fb.group({
      calle: ['', [Validators.required, Validators.pattern(this.regexCalle)]],
      cp: ['', [Validators.required, Validators.pattern(this.regexCP)]],
      provincia: ['', [Validators.required, Validators.pattern(this.regexLetras)]],
      nombre: ['', [Validators.required, Validators.pattern(this.regexLetras)]],
      apellido: ['', [Validators.required, Validators.pattern(this.regexLetras)]],
      fecha: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.regexEmail)]]
    });

    this.imgService.getImagenConfig().subscribe(res => {
      this.datosImagen = res;
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
    if (this.direccionForm.valid) {
      console.log('Datos guardados:', this.direccionForm.value);
      this.router.navigate(['/pagar']); 
    } else {
      this.direccionForm.markAllAsTouched();
    }
  }
}
