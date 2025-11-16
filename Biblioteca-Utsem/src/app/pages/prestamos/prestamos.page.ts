import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Prestamo } from 'src/app/modelos/LoginResponse';
import { RegistrarPrestamoComponent } from '../components/registrar-prestamo/registrar-prestamo.component';
import { RegresarPrestamosComponent } from '../components/regresar-prestamos/regresar-prestamos.component';
import { LoadingService } from 'src/app/shared/loading-service';
import { Loading } from 'src/app/shared/loading/loading';
// IMPORTA tu modal de registrar préstamo cuando lo tengas
// import { ModalRegistrarPrestamoComponent } from '../components/...';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, Loading]
})
export class PrestamosPage implements OnInit {

  searchTerm: string = "";
  prestamos: Prestamo[] = [];
  prestamosFiltrados: Prestamo[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private servicio: SerivicosService,
     private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.loadingService.show();
    this.servicio.obtenerPrestamos().subscribe({
      next: (resp) => {
        this.prestamos = resp;
        this.prestamosFiltrados = [...this.prestamos];
        this.loadingService.hide();
      },
      error: (err) => console.error("Error al cargar préstamos:", err)
      
    });


  }

  buscar() {
    if (this.searchTerm.trim() === "") {
      this.prestamosFiltrados = [...this.prestamos];
      return;
    }

    const busqueda = this.searchTerm.toLowerCase();

    this.prestamosFiltrados = this.prestamos.filter(p =>
      (p.alumnoNombre + ' ' + p.apellidoPaterno + ' ' + p.apellidoMaterno).toLowerCase().includes(busqueda) ||
      p.matricula.toLowerCase().includes(busqueda) ||
      p.libroTitulo.toLowerCase().includes(busqueda)
    );
  }

  limpiar() {
    this.searchTerm = "";
    this.prestamosFiltrados = [...this.prestamos];
  }

  async editarPrestamo(prestamo: Prestamo) {
    const modal = await this.modalController.create({
      component: RegresarPrestamosComponent,
      componentProps: { prestamoEditar: prestamo },
      backdropDismiss: false
    });
    await modal.present();
    this.cargarPrestamos();
  
  }

  eliminarPrestamo(prestamo: Prestamo) {
    console.log("Eliminar:", prestamo);
  }

 async nuevoPrestamo() {
  const modal = await this.modalController.create({
    component: RegistrarPrestamoComponent,
    cssClass: 'modal-registrar-prestamo',
    backdropDismiss: false
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

    this.cargarPrestamos();
}

}
