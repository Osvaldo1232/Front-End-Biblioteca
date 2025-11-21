import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ModalRegistrarEstudianteComponent } from '../components/estudiantes-registrados/modal-registrar-estudiante/modal-registrar-estudiante.component';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Estudiante } from 'src/app/modelos/LoginResponse';
import { LoadingService } from 'src/app/shared/loading-service';
import { Loading } from 'src/app/shared/loading/loading';

@Component({
  selector: 'app-estudiantes-registrados',
  templateUrl: './estudiantes-registrados.page.html',
  styleUrls: ['./estudiantes-registrados.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, Loading],
})
export class EstudiantesRegistradosPage implements OnInit {
  
  estudiantes: Estudiante[] = [];
  estudiantesFiltrados: Estudiante[] = [];
  busqueda: string = '';

  // 📄 PAGINADO
  paginaActual = 1;
  itemsPorPagina = 10;
  totalPaginas = 1;
  paginasArray: number[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private servicio: SerivicosService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.loadingService.show();
    this.servicio.obtenerEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.estudiantesFiltrados = [...data];
        this.configurarPaginado();
        this.loadingService.hide();
      },
      error: async () => {
        this.loadingService.hide();
      },
    });
  }

  // 🔎 Buscar SOLO cuando se da clic
  buscar() {
    if (this.busqueda.trim() === '') {
      this.estudiantesFiltrados = [...this.estudiantes];
    } else {
      const t = this.busqueda.toLowerCase();
      this.estudiantesFiltrados = this.estudiantes.filter((est) =>
        (`${est.nombre} ${est.apellidoPaterno} ${est.apellidoMaterno}`).toLowerCase().includes(t) ||
        est.matricula.toLowerCase().includes(t) ||
        est.carreraNombre.toLowerCase().includes(t)
      );
    }

    this.paginaActual = 1;
    this.configurarPaginado();
  }

  limpiar() {
    this.busqueda = '';
    this.estudiantesFiltrados = [...this.estudiantes];
    this.paginaActual = 1;
    this.configurarPaginado();
  }

  // 📄 CONFIGURAR PAGINADO
  configurarPaginado() {
    this.totalPaginas = Math.ceil(this.estudiantesFiltrados.length / this.itemsPorPagina);
    this.paginasArray = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  paginaActualDatos() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.estudiantesFiltrados.slice(inicio, fin);
  }

  irPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  paginaAnterior() {
    if (this.paginaActual > 1) this.paginaActual--;
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) this.paginaActual++;
  }

  irPrimera() {
    this.paginaActual = 1;
  }

  irUltima() {
    this.paginaActual = this.totalPaginas;
  }

  // 🟦 Nuevo estudiante
  async agregarNuevo() {
    const modal = await this.modalController.create({
      component: ModalRegistrarEstudianteComponent,
      cssClass: 'modal-registrar-estudiante',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.estudiante) {
      this.estudiantes.push(data.estudiante);
      this.buscar();
    }
  }

  // ✏ Editar estudiante
  async editarEstudiante(estudiante: Estudiante) {
    const modal = await this.modalController.create({
      component: ModalRegistrarEstudianteComponent,
      componentProps: { estudiante: { ...estudiante } },
      cssClass: 'modal-registrar-estudiante',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.estudiante) {
      this.cargarEstudiantes();
    }
  }
}
