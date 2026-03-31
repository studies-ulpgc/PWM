import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Similares } from './similares';

describe('Similares', () => {
  let component: Similares;
  let fixture: ComponentFixture<Similares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Similares],
    }).compileComponents();

    fixture = TestBed.createComponent(Similares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
