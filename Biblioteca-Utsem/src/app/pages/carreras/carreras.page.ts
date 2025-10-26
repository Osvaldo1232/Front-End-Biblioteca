import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario si usas two-way binding ([ngModel]) o ion-toggle
import { AlertController, ModalController, ToastController  } from '@ionic/angular';
import { IonicModule } from '@ionic/angular'; // Módulo principal de Ionic
import { ModalRegistrarCarreraComponent } from '../components/estudiantes-registrados/modal-registrar-carrera/modal-registrar-carrera.component';

interface Carrera {
  id: number;
  nombre: string;
  activo: boolean;
}
@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.page.html',
  styleUrls: ['./carreras.page.scss'],
  standalone: true,
  imports: [FormsModule, // ¡Importante! Para el manejo del ion-toggle
    IonicModule, CommonModule]
})
export class CarrerasPage implements OnInit {

 
carreras: Carrera[] = [];
  carrerasFiltradas: Carrera[] = [];
  busqueda: string = '';

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarCarreras();
  }

  cargarCarreras() {
    // Datos de ejemplo - reemplazar con servicio real
    this.carreras = [
      { id: 1, nombre: 'INGENIERIA EN DESARROLLO Y GESTIÓN DE SOFTWARE', activo: false },
      { id: 2, nombre: 'INGENIERIA EN DESARROLLO Y GESTIÓN DE SOFTWARE', activo: true },
      { id: 3, nombre: 'INGENIERIA EN DESARROLLO Y GESTIÓN DE SOFTWARE', activo: false },
      { id: 4, nombre: 'INGENIERIA EN DESARROLLO Y GESTIÓN DE SOFTWARE', activo: false },
      { id: 5, nombre: 'INGENIERIA EN DESARROLLO Y GESTIÓN DE SOFTWARE', activo: true },
      { id: 6, nombre: 'INGENIERIA EN DESARROLLO Y GESTIÓN DE SOFTWARE', activo: false },
    ];
    this.carrerasFiltradas = [...this.carreras];
  }

  buscarCarrera() {
    if (this.busqueda.trim() === '') {
      this.carrerasFiltradas = [...this.carreras];
    } else {
      this.carrerasFiltradas = this.carreras.filter(carrera =>
        carrera.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  }

  limpiarBusqueda() {
    this.busqueda = '';
    this.carrerasFiltradas = [...this.carreras];
  }

  async eliminarCarrera(carrera: Carrera) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro que desea eliminar la carrera "${carrera.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.carreras = this.carreras.filter(c => c.id !== carrera.id);
            this.buscarCarrera();
          },
        },
      ],
    });

    await alert.present();
  }

  editarCarrera(carrera: Carrera) {
    // Implementar navegación o modal para editar
    console.log('Editar carrera:', carrera);
  }

  cambiarEstado(carrera: Carrera) {
    carrera.activo = !carrera.activo;
    // Aquí deberías hacer la llamada al servicio para actualizar en el backend
  }

 async agregarNueva() {
    const modal = await this.modalController.create({
      component: ModalRegistrarCarreraComponent,
      cssClass: 'modal-registrar-carrera',
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.carrera) {
      // Agregar la nueva carrera
      this.carreras.push(data.carrera);
      this.buscarCarrera(); // Actualizar la lista filtrada

      // Mostrar mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Carrera registrada correctamente',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    }
  }
}
