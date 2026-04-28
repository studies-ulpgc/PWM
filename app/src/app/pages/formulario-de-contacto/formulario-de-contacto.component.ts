import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HeaderGrandeComponent } from '../../components/header-grande/header-grande.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-formulario-de-contacto',
  imports: [ReactiveFormsModule, HeaderGrandeComponent, FooterComponent],
  templateUrl: './formulario-de-contacto.component.html',
  styleUrl: './formulario-de-contacto.component.css',
})
export class FormularioDeContactoComponent implements OnInit {
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
