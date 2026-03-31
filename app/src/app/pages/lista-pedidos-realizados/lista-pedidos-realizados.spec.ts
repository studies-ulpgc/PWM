import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosRealizados } from './lista-pedidos-realizados';

describe('ListaPedidosRealizados', () => {
  let component: ListaPedidosRealizados;
  let fixture: ComponentFixture<ListaPedidosRealizados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPedidosRealizados],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPedidosRealizados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
