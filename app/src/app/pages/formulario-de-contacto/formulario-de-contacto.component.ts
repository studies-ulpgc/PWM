import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HeaderGrande } from '../../components/header-grande/header-grande';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-formulario-de-contacto',
  imports: [ReactiveFormsModule, HeaderGrande, Footer],
  templateUrl: './formulario-de-contacto.html',
  styleUrl: './formulario-de-contacto.css',
})
export class FormularioDeContacto implements OnInit {
  contactoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactoForm = this.fb.group({
      motivo: ['', Validators.required],
      asunto: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      console.log('Formulario enviado:', this.contactoForm.value);
      alert('¡Formulario enviado con éxito!');
      this.contactoForm.reset({ motivo: '' });
    } else {
      this.contactoForm.markAllAsTouched();
    }
  }
}
