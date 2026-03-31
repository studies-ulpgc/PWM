import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeContacto } from './formulario-de-contacto';

describe('FormularioDeContacto', () => {
  let component: FormularioDeContacto;
  let fixture: ComponentFixture<FormularioDeContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDeContacto],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioDeContacto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
