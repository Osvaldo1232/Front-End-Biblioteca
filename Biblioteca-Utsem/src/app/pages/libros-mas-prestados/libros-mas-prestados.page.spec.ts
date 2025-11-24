import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosMasPrestadosPage } from './libros-mas-prestados.page';

describe('LibrosMasPrestadosPage', () => {
  let component: LibrosMasPrestadosPage;
  let fixture: ComponentFixture<LibrosMasPrestadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosMasPrestadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
