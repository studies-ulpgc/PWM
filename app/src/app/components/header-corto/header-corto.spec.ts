import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCorto } from './header-corto';

describe('HeaderCorto', () => {
  let component: HeaderCorto;
  let fixture: ComponentFixture<HeaderCorto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCorto],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCorto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
