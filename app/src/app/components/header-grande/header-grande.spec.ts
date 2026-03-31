import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGrande } from './header-grande';

describe('HeaderGrande', () => {
  let component: HeaderGrande;
  let fixture: ComponentFixture<HeaderGrande>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderGrande],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderGrande);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
