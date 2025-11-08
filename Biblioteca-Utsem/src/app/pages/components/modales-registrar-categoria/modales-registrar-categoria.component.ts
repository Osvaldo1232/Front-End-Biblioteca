import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Categoria {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-modales-registrar-categoria',
  templateUrl: './modales-registrar-categoria.component.html',
  styleUrls: ['./modales-registrar-categoria.component.scss'],
    imports: [CommonModule, FormsModule, IonicModule]
})
export class ModalesRegistrarCategoriaComponent implements OnInit {
  categoria: Categoria = {
    id: '',
    nombre: '',
  };

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async aceptar() {
    if (!this.categoria.id || !this.categoria.nombre.trim()) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos.',
        duration: 2000,
        color: 'warning',
        position: 'bottom',
      });
      await toast.present();
      return;
    }

    // Cierra el modal y envía los datos
    this.modalController.dismiss({ categoria: this.categoria });
  }
}
