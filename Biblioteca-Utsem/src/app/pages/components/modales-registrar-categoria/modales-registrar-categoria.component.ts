import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Categoria } from 'src/app/modelos/LoginResponse';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { AlertService } from 'src/app/shared/alert-service';

@Component({
  selector: 'app-modales-registrar-categoria',
  templateUrl: './modales-registrar-categoria.component.html',
  styleUrls: ['./modales-registrar-categoria.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ModalesRegistrarCategoriaComponent implements OnInit {

  @Input() categoria: Categoria = { id: '', nombre: '' };

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private categoriasService: SerivicosService,
    private alerta :AlertService
  ) {}

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async aceptar() {
    if (!this.categoria.nombre.trim()) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa el nombre de la categoría.',
        duration: 2000,
        color: 'warning',
        position: 'bottom',
      });
      await toast.present();
      return;
    }

    if (this.categoria.id) {
      this.categoriasService.actualizarCategoria(this.categoria.id, { nombre: this.categoria.nombre })
        .subscribe({
          next: async (resp) => {
             this.alerta.show(
              'La categoria se actualizó correctamente',
              'success',
              'Éxito'
            );
            this.modalController.dismiss({ categoria: resp });
          },
          error: async () => {
             this.alerta.show(
              'La categoria no se actualizo correctamente',
              'danger',
              'Éxito'
            );
          },
        });
    } else {
      this.categoriasService.crearCategoria({ nombre: this.categoria.nombre })
        .subscribe({
          next: async (resp) => {
           this.alerta.show(
              'La categoria se guardo con exito',
              'success',
              'Éxito'
            );
            this.modalController.dismiss({ categoria: resp });
          },
          error: async () => {
             this.alerta.show(
              'Ocurrio un error al crear la categoria',
              'success',
              'Éxito'
            );
          },
        });
    }
  }
}
