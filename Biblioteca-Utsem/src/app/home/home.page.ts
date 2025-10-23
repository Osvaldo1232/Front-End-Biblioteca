import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule  // <-- esto permite usar ion-label, ion-input, ion-button, etc.
  ],

})
export class HomePage {

  usuario: string = '';
  password: string = '';

  constructor() {}

  login() {
    console.log('Usuario:', this.usuario, 'Contraseña:', this.password);
    // Aquí llamas a tu servicio de autenticación
    // Ejemplo: this.authService.login(this.usuario, this.password)
  }

  
}
