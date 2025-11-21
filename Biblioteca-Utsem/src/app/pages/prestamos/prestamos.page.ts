import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Prestamo } from 'src/app/modelos/LoginResponse';
import { RegistrarPrestamoComponent } from '../components/registrar-prestamo/registrar-prestamo.component';
import { RegresarPrestamosComponent } from '../components/regresar-prestamos/regresar-prestamos.component';
import { LoadingService } from 'src/app/shared/loading-service';
import { Loading } from 'src/app/shared/loading/loading';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, Loading]
})
export class PrestamosPage implements OnInit {

  searchTerm: string = "";
  prestamos: Prestamo[] = [];
  prestamosFiltrados: Prestamo[] = [];
  prestamosPaginados: Prestamo[] = [];

  // PAGINACIÓN
  paginaActual = 1;
  elementosPorPagina = 10;
  totalPaginas = 0;
  paginasArray: number[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private servicio: SerivicosService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.loadingService.show();
    this.servicio.obtenerPrestamos().subscribe({
      next: (resp) => {
        this.prestamos = resp;
        this.prestamosFiltrados = [...this.prestamos];

        this.actualizarPaginacion();

        this.loadingService.hide();
      },
      error: (err) => console.error("Error al cargar préstamos:", err)
    });
  }

  // -------------------
  // BÚSQUEDA
  // -------------------
  buscar() {
    const texto = this.searchTerm.trim().toLowerCase();

    if (texto === "") {
      this.prestamosFiltrados = [...this.prestamos];
    } else {
      this.prestamosFiltrados = this.prestamos.filter(p =>
        (p.alumnoNombre + ' ' + p.apellidoPaterno + ' ' + p.apellidoMaterno).toLowerCase().includes(texto) ||
        p.matricula.toLowerCase().includes(texto) ||
        p.libroTitulo.toLowerCase().includes(texto)
      );
    }

    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  limpiar() {
    this.searchTerm = "";
    this.prestamosFiltrados = [...this.prestamos];
    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  // -------------------
  // PAGINACIÓN
  // -------------------
  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.prestamosFiltrados.length / this.elementosPorPagina);

    this.paginasArray = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);

    this.actualizarPrestamosPaginados();
  }

  actualizarPrestamosPaginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;

    this.prestamosPaginados = this.prestamosFiltrados.slice(inicio, fin);
  }

  irPagina(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarPrestamosPaginados();
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPrestamosPaginados();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPrestamosPaginados();
    }
  }

  irPrimera() {
    this.paginaActual = 1;
    this.actualizarPrestamosPaginados();
  }

  irUltima() {
    this.paginaActual = this.totalPaginas;
    this.actualizarPrestamosPaginados();
  }

  // -------------------
  // EDITAR
  // -------------------
  async editarPrestamo(prestamo: Prestamo) {
    const modal = await this.modalController.create({
      component: RegresarPrestamosComponent,
      componentProps: { prestamoEditar: prestamo },
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    this.cargarPrestamos();
  }

  // -------------------
  // NUEVO
  // -------------------
  async nuevoPrestamo() {
    const modal = await this.modalController.create({
      component: RegistrarPrestamoComponent,
      cssClass: 'modal-registrar-prestamo',
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    this.cargarPrestamos();
  }

}
