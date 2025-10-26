import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Módulo principal de Ionic

interface Prestamo {
  id: number;
  matricula: string;
  alumno: string;
  carrera: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
  titulo: string;
}

@Component({
  selector: 'app-prestamos-vencidos',
  templateUrl: './prestamos-vencidos.page.html',
  styleUrls: ['./prestamos-vencidos.page.scss'],
  standalone: true,
   imports: [FormsModule, // ¡Importante! Para el manejo del ion-toggle
      IonicModule, CommonModule]

})
export class PrestamosVencidosPage implements OnInit {

  prestamos: Prestamo[] = [];
  prestamosFiltrados: Prestamo[] = [];
  
  // Filtros
  fechaPrestamo: string = '';
  alumnoSeleccionado: string = '';
  libroSeleccionado: string = '';
  carreraSeleccionada: string = '';

  // Listas para los selects
  alumnos: string[] = [];
  libros: string[] = [];
  carreras: string[] = [];

  constructor() {}

  ngOnInit() {
    this.cargarPrestamos();
    this.cargarFiltros();
  }

  cargarPrestamos() {
    // Datos de ejemplo - reemplazar con servicio real
    this.prestamos = [
      {
        id: 1,
        matricula: '262310167',
        alumno: 'Osvaldo Florencio Jeronimo',
        carrera: 'Enfermeria',
        fechaPrestamo: '10-02-2025',
        fechaDevolucion: '20-02-2025',
        titulo: 'Bajo la misma Estrella'
      },
      {
        id: 2,
        matricula: '262310167',
        alumno: 'Osvaldo Florencio Jeronimo',
        carrera: 'Enfermeria',
        fechaPrestamo: '10-02-2025',
        fechaDevolucion: '20-02-2025',
        titulo: 'Bajo la misma Estrella'
      },
      {
        id: 3,
        matricula: '262310167',
        alumno: 'Osvaldo Florencio Jeronimo',
        carrera: 'Enfermeria',
        fechaPrestamo: '10-02-2025',
        fechaDevolucion: '20-02-2025',
        titulo: 'Bajo la misma Estrella'
      },
      {
        id: 4,
        matricula: '262310167',
        alumno: 'Osvaldo Florencio Jeronimo',
        carrera: 'Enfermeria',
        fechaPrestamo: '10-02-2025',
        fechaDevolucion: '20-02-2025',
        titulo: 'Bajo la misma Estrella'
      },
      {
        id: 5,
        matricula: '262310167',
        alumno: 'Osvaldo Florencio Jeronimo',
        carrera: 'Enfermeria',
        fechaPrestamo: '10-02-2025',
        fechaDevolucion: '20-02-2025',
        titulo: 'Bajo la misma Estrella'
      },
      {
        id: 6,
        matricula: '262310167',
        alumno: 'Osvaldo Florencio Jeronimo',
        carrera: 'Enfermeria',
        fechaPrestamo: '10-02-2025',
        fechaDevolucion: '20-02-2025',
        titulo: 'Bajo la misma Estrella'
      }
    ];
    this.prestamosFiltrados = [...this.prestamos];
  }

  cargarFiltros() {
    // Extraer valores únicos para los filtros
    this.alumnos = [...new Set(this.prestamos.map(p => p.alumno))];
    this.libros = [...new Set(this.prestamos.map(p => p.titulo))];
    this.carreras = [...new Set(this.prestamos.map(p => p.carrera))];
  }

  buscarPrestamos() {
    this.prestamosFiltrados = this.prestamos.filter(prestamo => {
      const cumpleFecha = !this.fechaPrestamo || prestamo.fechaPrestamo === this.fechaPrestamo;
      const cumpleAlumno = !this.alumnoSeleccionado || prestamo.alumno === this.alumnoSeleccionado;
      const cumpleLibro = !this.libroSeleccionado || prestamo.titulo === this.libroSeleccionado;
      const cumpleCarrera = !this.carreraSeleccionada || prestamo.carrera === this.carreraSeleccionada;
      
      return cumpleFecha && cumpleAlumno && cumpleLibro && cumpleCarrera;
    });
  }

  limpiarFiltros() {
    this.fechaPrestamo = '';
    this.alumnoSeleccionado = '';
    this.libroSeleccionado = '';
    this.carreraSeleccionada = '';
    this.prestamosFiltrados = [...this.prestamos];
  }
}
