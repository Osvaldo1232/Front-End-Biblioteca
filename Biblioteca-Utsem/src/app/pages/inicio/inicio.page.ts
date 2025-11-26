import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { AuthStateService } from 'src/app/Servicios/auth-state-service';
import { UsuarioDa, UsuarioInfo } from 'src/app/modelos/LoginResponse';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class InicioPage implements OnInit {
  sidebarVisible: boolean = true;
  isMobile: boolean = false;
logueado:any;
usuarios!: UsuarioDa;
  usuario:any;
  constructor(private router: Router, private loginService: SerivicosService, private authState: AuthStateService ) {}

  ngOnInit() {
    this.checkScreenSize();

this.logueado=this.loginService.logueado();
     this.loginService.obtenerUsuarioLogueado(this.logueado).subscribe({
      next: (data) => {
        this.usuarios = data;
      }
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarVisible = !this.isMobile; 
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.sidebarVisible = false;
    }
  }

    logout(): void {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }

  ObtenerUsuario(){

  }
}
