import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeseados } from './lista-deseados';

describe('ListaDeseados', () => {
  let component: ListaDeseados;
  let fixture: ComponentFixture<ListaDeseados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeseados],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDeseados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
