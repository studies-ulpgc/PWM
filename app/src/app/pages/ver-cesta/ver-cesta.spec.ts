import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCesta } from './ver-cesta';

describe('VerCesta', () => {
  let component: VerCesta;
  let fixture: ComponentFixture<VerCesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCesta],
    }).compileComponents();

    fixture = TestBed.createComponent(VerCesta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
