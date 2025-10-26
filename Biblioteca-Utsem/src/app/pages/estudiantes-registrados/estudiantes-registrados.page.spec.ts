import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudiantesRegistradosPage } from './estudiantes-registrados.page';

describe('EstudiantesRegistradosPage', () => {
  let component: EstudiantesRegistradosPage;
  let fixture: ComponentFixture<EstudiantesRegistradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesRegistradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
