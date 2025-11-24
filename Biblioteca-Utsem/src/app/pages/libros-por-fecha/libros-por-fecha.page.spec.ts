import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosPorFechaPage } from './libros-por-fecha.page';

describe('LibrosPorFechaPage', () => {
  let component: LibrosPorFechaPage;
  let fixture: ComponentFixture<LibrosPorFechaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosPorFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
