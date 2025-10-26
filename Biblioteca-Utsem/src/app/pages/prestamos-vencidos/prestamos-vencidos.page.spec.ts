import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestamosVencidosPage } from './prestamos-vencidos.page';

describe('PrestamosVencidosPage', () => {
  let component: PrestamosVencidosPage;
  let fixture: ComponentFixture<PrestamosVencidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamosVencidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
