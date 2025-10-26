import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-modal-registrar-estudiante',
  templateUrl: './modal-registrar-estudiante.component.html',
  styleUrls: ['./modal-registrar-estudiante.component.scss'],
   imports: [CommonModule,
      FormsModule,
      IonicModule,
    ]
})
export class ModalRegistrarEstudianteComponent  implements OnInit {
 estudiante = {
    matricula: '',
    nombre: '',
    apellidos: '',
    carrera: ''
  };

  carreras: string[] = [
    'Tics',
    'Mecatronica',
    'Lengua Inglesa',
    'Contabilidad',
    'Administración',
    'Enfermeria'
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  aceptar() {
    // Validar que todos los campos estén llenos
    if (!this.estudiante.matricula || !this.estudiante.nombre || 
        !this.estudiante.apellidos || !this.estudiante.carrera) {
      // Aquí podrías mostrar un toast de error
      return;
    }

    // Devolver los datos del estudiante
    this.modalController.dismiss({
      estudiante: this.estudiante
    });
  }

}
