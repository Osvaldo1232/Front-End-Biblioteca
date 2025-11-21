import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { LoadingService } from 'src/app/shared/loading-service';
import { Loading } from 'src/app/shared/loading/loading';

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
  prestamosPaginados: any[] = [];

  fechaPrestamo = '';
  alumnoSeleccionado = '';
  libroSeleccionado = '';
  carreraSeleccionada = '';

  alumnos: string[] = [];
  libros: string[] = [];
  carreras: string[] = [];

  // PAGINACIÓN
  paginaActual = 1;
  itemsPorPagina = 6;
  totalPaginas = 1;
  paginasArray: number[] = [];

  constructor(
    private prestamosService: SerivicosService,
    private loadingService: LoadingService
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
        this.configurarPaginacion();
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

  // -----------------------
  //     PAGINACIÓN
  // -----------------------

  configurarPaginacion() {
    this.totalPaginas = Math.ceil(this.prestamosFiltrados.length / this.itemsPorPagina);
    this.paginasArray = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.paginaActual = 1;
    this.actualizarPagina();
  }

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.prestamosPaginados = this.prestamosFiltrados.slice(inicio, fin);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPagina();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPagina();
    }
  }

  irPagina(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarPagina();
  }

  irPrimera() {
    this.paginaActual = 1;
    this.actualizarPagina();
  }

  irUltima() {
    this.paginaActual = this.totalPaginas;
    this.actualizarPagina();
  }
}
