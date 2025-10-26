import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-registrar-libro',
  templateUrl: './modal-registrar-libro.component.html',
  styleUrls: ['./modal-registrar-libro.component.scss'],
   imports: [CommonModule,
      FormsModule,
      IonicModule,
    ]
})
export class ModalRegistrarLibroComponent  implements OnInit {

 libro = {
    titulo: '',
    autores: '',
    anioPublicacion: '',
    editorial: '',
    copiasDisponibles: ''
  };

  currentYear = new Date().getFullYear();

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  aceptar() {
    // Validar que todos los campos estén llenos
    if (!this.libro.titulo || !this.libro.autores || 
        !this.libro.anioPublicacion || !this.libro.editorial || 
        !this.libro.copiasDisponibles) {
      // Aquí podrías mostrar un toast de error
      return;
    }

    // Validar que el año sea un número válido
    const anio = parseInt(this.libro.anioPublicacion);
    if (isNaN(anio) || anio < 1000 || anio > new Date().getFullYear()) {
      // Toast de error para año inválido
      return;
    }

    // Validar que las copias sea un número válido
    const copias = parseInt(this.libro.copiasDisponibles);
    if (isNaN(copias) || copias < 0) {
      // Toast de error para copias inválidas
      return;
    }

    // Devolver los datos del libro
    this.modalController.dismiss({
      libro: this.libro
    });
  }

}
