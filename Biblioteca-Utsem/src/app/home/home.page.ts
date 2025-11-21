import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SerivicosService } from '../Servicios/serivicos-service';
import { Alert } from '../shared/alert/alert';
import { AlertService } from '../shared/alert-service';
import { AuthStateService } from '../Servicios/auth-state-service';
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
  errorMsg: string = '';

  constructor(private router: Router, private authService: SerivicosService, private alert:AlertService,private authState: AuthStateService ) {}

  login() {
    this.authService.login(this.usuario, this.password).subscribe({
      next: (res) => {
           this.authState.setUsuario(res);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error(err);

          this.alert.show(
  'Usuario o contraseña incorrectos. Verifica tus datos.',
  'danger',
  'Error de autenticación'
);
      }
    });
  }
  
}
