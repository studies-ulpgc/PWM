import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCuenta } from './ver-cuenta';

describe('VerCuenta', () => {
  let component: VerCuenta;
  let fixture: ComponentFixture<VerCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCuenta],
    }).compileComponents();

    fixture = TestBed.createComponent(VerCuenta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
