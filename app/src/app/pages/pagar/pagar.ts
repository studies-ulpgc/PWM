import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-pagar',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderGrande, Footer],
  templateUrl: './pagar.html',
  styleUrl: './pagar.css',
})
export class Pagar implements OnInit {
  pagoForm!: FormGroup;
  mostrarDirecciones = false;
  
  direcciones = [
    { nombre: 'Marcos Pérez del Río', calle: 'Calle Principal 1' },
    { nombre: 'Antonia García Ortega', calle: 'Av. Secundaria 45' }
  ];
  
  direccionSeleccionada = {
    nombre: 'Nombre y Apellidos',
    detalles: 'Calle Falsa 123, 28001 Madrid, España'
  };

  productos = new Array(8);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.pagoForm = this.fb.group({
      cupon: ['', [Validators.pattern('^[0-9]{8}$')]],
      tarjetaRegalo: ['', [Validators.pattern('^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$')]]
    });
  }

  seleccionarDireccion(dir: any) {
    this.direccionSeleccionada = {
      nombre: dir.nombre,
      detalles: dir.calle + ', Ciudad, País'
    };
    this.mostrarDirecciones = false;
  }

  onPagar() {
    if (this.pagoForm.valid) {
      alert('Procesando pago...');
    } else {
      this.pagoForm.markAllAsTouched();
    }
  }
}
