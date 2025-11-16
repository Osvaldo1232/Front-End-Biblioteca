import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/shared/alert-service';

@Component({
  selector: 'app-registrar-prestamo',
  templateUrl: './registrar-prestamo.component.html',
  styleUrls: ['./registrar-prestamo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RegistrarPrestamoComponent implements OnInit {

  alumnos: any[] = [];
  alumnosFiltrados: any[] = [];

  libros: any[] = [];
  librosFiltrados: any[] = [];

  buscarAlumno = '';
  buscarLibro = '';

  prestamo = {
    alumnoId: '',
    libroId: '',
    cantidad: 0,
    fechaDevolucion: ''
  };

  alertOptionsAlumnos = {
    header: 'Seleccionar Alumno',
    inputs: [{ type: 'text', placeholder: 'Buscar...' }]
  };

  alertOptionsLibros = {
    header: 'Seleccionar Libro',
    inputs: [{ type: 'text', placeholder: 'Buscar...' }]
  };

  constructor(
    private servicio: SerivicosService,
    private modalCtrl: ModalController,
     private alerta: AlertService
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
    this.cargarLibros();
  }

  cargarAlumnos() {
    this.servicio.obtenerEstudiantes().subscribe({
      next: (resp) => {
        this.alumnos = resp;
        this.alumnosFiltrados = [...resp];
      }
    });
  }

  cargarLibros() {
    this.servicio.obtenerLibros().subscribe({
      next: (resp) => {
        this.libros = resp;
        this.librosFiltrados = [...resp];
      }
    });
  }

  filtrarAlumnos(term: string) {
    const texto = term.toLowerCase();
    this.alumnosFiltrados = this.alumnos.filter(a =>
      `${a.nombre} ${a.apellidoPaterno} ${a.apellidoMaterno}`
        .toLowerCase()
        .includes(texto)
    );
  }

  filtrarLibros(term: string) {
    const texto = term.toLowerCase();
    this.librosFiltrados = this.libros.filter(l =>
      l.titulo.toLowerCase().includes(texto)
    );
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  // ========================================
  // 🚀 REGISTRAR PRÉSTAMO
  // ========================================
 aceptar() {
  // Validación rápida
  if (
    !this.prestamo.alumnoId ||
    !this.prestamo.libroId ||
    !this.prestamo.cantidad ||
    !this.prestamo.fechaDevolucion
  ) {
    this.alerta.show(
      'Todos los campos son obligatorios',
      'danger',
      'Error'
    );
    return;
  }

  this.servicio.registrarPrestamo(this.prestamo).subscribe({
    next: (resp) => {
      this.alerta.show(
        'El préstamo se registró correctamente',
        'success',
        'Éxito'
      );

      this.modalCtrl.dismiss({ prestamo: resp });
    },
    error: (err) => {

      // ===========================
      // Mostrar mensaje real del backend
      // ===========================
      const mensajeBackend =
        err?.error?.error ||        // El mensaje que manda tu API
        err?.message ||             // Fallback
        'Ocurrió un error al registrar el préstamo';

      this.alerta.show(
        mensajeBackend,
        'danger',
        'Error'
      );
    }
  });
}

}
