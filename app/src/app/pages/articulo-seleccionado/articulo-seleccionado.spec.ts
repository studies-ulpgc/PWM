import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloSeleccionado } from './articulo-seleccionado';

describe('ArticuloSeleccionado', () => {
  let component: ArticuloSeleccionado;
  let fixture: ComponentFixture<ArticuloSeleccionado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloSeleccionado],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticuloSeleccionado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
