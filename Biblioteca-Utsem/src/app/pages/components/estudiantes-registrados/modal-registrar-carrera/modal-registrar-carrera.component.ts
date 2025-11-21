import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Carrera } from 'src/app/modelos/LoginResponse';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/alert-service';
@Component({
  selector: 'app-modal-registrar-carrera',
  templateUrl: './modal-registrar-carrera.component.html',
  styleUrls: ['./modal-registrar-carrera.component.scss'],
  standalone: true,
   imports: [CommonModule, FormsModule, IonicModule],

})
export class ModalRegistrarCarreraComponent {

  @Input() carrera: any = {
    id: null,
    nombre: '',
    activo: true 
  };

  constructor(
    private modalController: ModalController,
    private carrerasService: SerivicosService,
        private alertService: AlertService
  ) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  aceptar() {
    const carreraPayload: Carrera = {
      nombre: this.carrera.nombre,
      estatus: this.carrera.activo ? 'ACTIVO' : 'INACTIVO'
    };

    if (this.carrera.id) {
      this.carrerasService.actualizarCarrera(this.carrera.id, carreraPayload)
        .subscribe({
          next: (resp) => {
            this.modalController.dismiss({ carrera: resp });

            this.alertService.show(
  'La carrera se actualizo correctamente',
  'success',
  'Exito'
);
          },
          error: (err) => {
             if(err.status==500){
            let mensaje = err.error.error;
            console.log(mensaje)
                this.alertService.show(
  mensaje,
  'danger',
  'Error'
);
            }
          }
        });
    } else {
      this.carrerasService.crearCarrera(carreraPayload)
        .subscribe({
          next: (resp) => {

             this.alertService.show(
  'La carrera se guardo correctamente',
  'success',
  'Exito'
);
            this.modalController.dismiss({ carrera: resp });
          },
          error: (err) => {
            if(err.status==500){
            let mensaje = err.error.error;
            console.log(mensaje)
                this.alertService.show(
  mensaje,
  'danger',
  'Error'
);
            }
          }
        });
    }
  }
}
