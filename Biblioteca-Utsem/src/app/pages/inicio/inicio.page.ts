import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  // Detecta cuando cambia el tamaño de pantalla
  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarVisible = !this.isMobile; // ocultar en móvil, mostrar en escritorio
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  // Cierra el sidebar si estamos en móvil
  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.sidebarVisible = false;
    }
  }

  logout() {
    this.router.navigate(['/home']);
  }
}
