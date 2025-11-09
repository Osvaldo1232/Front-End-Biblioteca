import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Autor } from 'src/app/modelos/LoginResponse';
import { AlertService } from 'src/app/shared/alert-service';

@Component({
  selector: 'app-modales-registrar-autores',
  templateUrl: './modales-registrar-autores.component.html',
  styleUrls: ['./modales-registrar-autores.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ModalesRegistrarAutoresComponent implements OnInit {
  @Input() autor: Autor = {
    id: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nacionalidad: '',
  };

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private autoresService: SerivicosService,
    private alertService:AlertService
  ) {}

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async aceptar() {
    if (
      !this.autor.nombre.trim() ||
      !this.autor.apellidoPaterno.trim() ||
      !this.autor.apellidoMaterno.trim() ||
      !this.autor.nacionalidad.trim()
    ) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos.',
        duration: 2000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    if (this.autor.id) {
      // EDITAR AUTOR
      this.autoresService.actualizarAutor(this.autor.id, this.autor).subscribe({
        next: async (resp) => {
         

           this.alertService.show(
  'Autor actualizado correctamente.',
  'success',
  'Exito'
);

          this.modalController.dismiss({ autor: resp });
        },
        error: async () => {
           
           this.alertService.show(
  'Fallo al actualizar el autor',
  'danger',
  'Error'
);
        },
      });
    } else {
      // CREAR AUTOR
      this.autoresService.crearAutor(this.autor).subscribe({
        next: async (resp) => {
          
           this.alertService.show(
  'Autor registrado correctamente.',
  'success',
  'Exito'
);
          this.modalController.dismiss({ autor: resp });
        },
        error: async () => {
         
           this.alertService.show(
  'Fallo al registrar el autor',
  'danger',
  'Error'
);
        },
      });
    }
  }
}
