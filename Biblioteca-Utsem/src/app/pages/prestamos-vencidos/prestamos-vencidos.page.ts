import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading-service';
import { Loading } from 'src/app/shared/loading/loading';

interface Estudiante {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
}
interface Carrera {
  nombre: string;
}
interface Libro {
  titulo: string;
}

@Component({
  selector: 'app-prestamos-vencidos',
  templateUrl: './prestamos-vencidos.page.html',
  styleUrls: ['./prestamos-vencidos.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule, CommonModule, Loading]
})
export class PrestamosVencidosPage implements OnInit {

  prestamos: any[] = [];
  prestamosFiltrados: any[] = [];

  fechaPrestamo = '';
  alumnoSeleccionado = '';
  libroSeleccionado = '';
  carreraSeleccionada = '';

  alumnos: string[] = [];
  libros: string[] = [];
  carreras: string[] = [];

  constructor(private prestamosService: SerivicosService,      private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.cargarFiltros();
    this.buscarPrestamos();
  }

  cargarFiltros() {
    this.prestamosService.obtenerEstudiantes().subscribe(estudiantes => {
      this.alumnos = estudiantes.map(e => `${e.nombre}`);
    });

    this.prestamosService.obtenerLibros().subscribe(libros => {
      this.libros = libros.map(l => l.titulo);
    });

    this.prestamosService.obtenerCarreras().subscribe(carreras => {
      this.carreras = carreras.map(c => c.nombre);
    });
  }

  buscarPrestamos() {

this.loadingService.show();
    this.prestamosService.buscarPrestamos(
      this.fechaPrestamo,
      this.alumnoSeleccionado,
      this.libroSeleccionado,
      'VENCIDO'
    ).subscribe({
      next: (data) => {
        this.prestamos = data;
        this.prestamosFiltrados = data;
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Error al cargar préstamos vencidos:', err);
      }
    });
  }

  limpiarFiltros() {
    this.fechaPrestamo = '';
    this.alumnoSeleccionado = '';
    this.libroSeleccionado = '';
    this.carreraSeleccionada = '';
    this.buscarPrestamos();
  }
}
