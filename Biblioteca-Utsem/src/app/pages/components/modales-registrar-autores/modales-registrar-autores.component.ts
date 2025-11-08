import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modales-registrar-autores',
  templateUrl: './modales-registrar-autores.component.html',
  styleUrls: ['./modales-registrar-autores.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ModalesRegistrarAutoresComponent implements OnInit {

  autor = {
    id: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nacionalidad: ''
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
    // Validar campos vacíos
    if (!this.autor.id || !this.autor.nombre || !this.autor.apellidoPaterno || 
        !this.autor.apellidoMaterno || !this.autor.nacionalidad) {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    // Cerrar modal y enviar datos
    this.modalController.dismiss({
      autor: this.autor
    });

    const toast = await this.toastController.create({
      message: 'Autor registrado correctamente.',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }
}
