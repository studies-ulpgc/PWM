import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarDireccionEntrega } from './configurar-direccion-entrega';

describe('ConfigurarDireccionEntrega', () => {
  let component: ConfigurarDireccionEntrega;
  let fixture: ComponentFixture<ConfigurarDireccionEntrega>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurarDireccionEntrega],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurarDireccionEntrega);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
