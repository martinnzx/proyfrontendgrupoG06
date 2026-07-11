import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoExitosoComponentComponent } from './pago-exitoso-component.component';

describe('PagoExitosoComponentComponent', () => {
  let component: PagoExitosoComponentComponent;
  let fixture: ComponentFixture<PagoExitosoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoExitosoComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoExitosoComponentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
