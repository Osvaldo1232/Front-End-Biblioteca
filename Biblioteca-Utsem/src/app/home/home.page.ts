import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  login() {
    console.log('Usuario:', this.usuario, 'Contraseña:', this.password);
    this.router.navigate(['/inicio']);
  }

  
}
