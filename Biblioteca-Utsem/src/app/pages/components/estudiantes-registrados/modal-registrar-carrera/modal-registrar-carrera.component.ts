import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-registrar-carrera',
  templateUrl: './modal-registrar-carrera.component.html',
  styleUrls: ['./modal-registrar-carrera.component.scss'],
  imports: [CommonModule,
      FormsModule,
      IonicModule,
    ]
})
export class ModalRegistrarCarreraComponent  implements OnInit {

  carrera = {
     
     nombre: '',
     activo: true
     
   };
 
  
 
   constructor(private modalController: ModalController) {}
 
   ngOnInit() {}
 
   cerrarModal() {
     this.modalController.dismiss();
   }
 
   aceptar() {
     // Validar que todos los campos estén llenos
     if (!this.carrera.nombre  
        ) {
       // Aquí podrías mostrar un toast de error
       return;
     }
 
     // Devolver los datos del estudiante
     this.modalController.dismiss({
       estudiante: this.carrera
     });
   }
 

}
