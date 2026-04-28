import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-pagar',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderGrandeComponent, FooterComponent],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.css',
})
export class PagarComponent implements OnInit {
  pagoForm!: FormGroup;
  mostrarDirecciones = false;

  listaProductos: any[] = [];

  direcciones = [
    { nombre: 'Marcos Pérez del Río', calle: 'Calle Principal 1' },
    { nombre: 'Antonia García Ortega', calle: 'Av. Secundaria 45' }
  ];

  direccionSeleccionada = {
    nombre: 'Nombre y Apellidos',
    detalles: 'Calle Falsa 123, 28001 Madrid, España'
  };

  productos = new Array(8);

  constructor(private fb: FormBuilder, private productoService: ProductoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pagoForm = this.fb.group({
      cupon: ['', [Validators.pattern('^[0-9]{8}$')]],
      tarjetaRegalo: ['', [Validators.pattern('^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$')]]
    });

    this.cargarImagenesProductos();
  }

  cargarImagenesProductos() {
  this.productoService.getProductos().subscribe(data => {
    const productosBase = data || [];
    this.listaProductos = [...productosBase, ...productosBase, ...productosBase];

    this.cdr.detectChanges();
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
