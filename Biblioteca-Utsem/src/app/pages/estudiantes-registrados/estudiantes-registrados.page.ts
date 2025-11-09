import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController, ModalController } from '@ionic/angular';
import { ModalRegistrarEstudianteComponent } from '../components/estudiantes-registrados/modal-registrar-estudiante/modal-registrar-estudiante.component';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Estudiante } from 'src/app/modelos/LoginResponse';

@Component({
  selector: 'app-estudiantes-registrados',
  templateUrl: './estudiantes-registrados.page.html',
  styleUrls: ['./estudiantes-registrados.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class EstudiantesRegistradosPage implements OnInit {
  estudiantes: Estudiante[] = [];
  estudiantesFiltrados: Estudiante[] = [];
  busqueda: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private servicio: SerivicosService
  ) {}

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.servicio.obtenerEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.estudiantesFiltrados = [...data];
      },
      error: async (err) => {
        console.error('Error al cargar estudiantes:', err);
        const toast = await this.toastController.create({
          message: 'Error al cargar estudiantes',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }

  buscarEstudiante() {
    if (this.busqueda.trim() === '') {
      this.estudiantesFiltrados = [...this.estudiantes];
      return;
    }

    const termino = this.busqueda.toLowerCase();
    this.estudiantesFiltrados = this.estudiantes.filter((est) =>
      `${est.nombre} ${est.apellidoPaterno} ${est.apellidoMaterno}`
        .toLowerCase()
        .includes(termino) ||
      est.matricula.toLowerCase().includes(termino) ||
      est.carreraNombre.toLowerCase().includes(termino)
    );
  }

  limpiarBusqueda() {
    this.busqueda = '';
    this.estudiantesFiltrados = [...this.estudiantes];
  }

  async agregarNuevo() {
    const modal = await this.modalController.create({
      component: ModalRegistrarEstudianteComponent,
      cssClass: 'modal-registrar-estudiante',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.estudiante) {
      // Guardar en backend si quieres o solo actualizar tabla local
      this.estudiantes.push(data.estudiante);
      this.buscarEstudiante();

      
    }
  }

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
      this.buscarEstudiante();

      
    }
  }
}
