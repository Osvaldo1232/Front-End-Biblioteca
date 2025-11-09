import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario si usas two-way binding ([ngModel]) o ion-toggle
import { AlertController, ModalController, ToastController  } from '@ionic/angular';
import { IonicModule } from '@ionic/angular'; // Módulo principal de Ionic
import { ModalRegistrarCarreraComponent } from '../components/estudiantes-registrados/modal-registrar-carrera/modal-registrar-carrera.component';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Carrera } from 'src/app/modelos/LoginResponse';


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
    private toastController: ToastController,
    private carrerasService:SerivicosService
  ) {}

  ngOnInit() {
    this.cargarCarreras();
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

 async editarCarrera(carrera: any) {
  const modal = await this.modalController.create({
    component: ModalRegistrarCarreraComponent,
    componentProps: { 
      carrera: { ...carrera, activo: carrera.estatus === 'ACTIVO' } 
    },
    cssClass: 'modal-registrar-carrera',
    backdropDismiss: false
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data && data.carrera) {
    const index = this.carreras.findIndex(c => c.id === data.carrera.id);
    if (index !== -1) this.carreras[index] = data.carrera;

    this.cargarCarreras();
  }
}

cambiarEstado(carrera: Carrera) {
  // alternar entre ACTIVO e INACTIVO
  carrera.estatus = carrera.estatus === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

  // Llamar al servicio para actualizar en el backend
  this.carrerasService.actualizarEstatus(carrera.id!, carrera.estatus)
    .subscribe({
      next: () => console.log('Estatus actualizado correctamente'),
      error: (err) => console.error('Error al actualizar estatus', err)
    });
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

     
    }
  }


  cargarCarreras() {
    this.carrerasService.obtenerCarreras().subscribe({
      next: (data) => {
        this.carreras = data.map(c => ({
          ...c,
          activo: c.estatus === 'ACTIVO'
        }));
        this.carrerasFiltradas = [...this.carreras];
      },
      error: (err) => {
        console.error('Error al cargar carreras:', err);
      }
    });
  }
}
