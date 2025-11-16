import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ModalRegistrarLibroComponent } from '../components/estudiantes-registrados/modal-registrar-libro/modal-registrar-libro.component';
import { Libro, Libros } from 'src/app/modelos/LoginResponse';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { LoadingService } from 'src/app/shared/loading-service';
import { Loading } from 'src/app/shared/loading/loading';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, Loading]
})
export class LibrosPage implements OnInit {

  searchTerm: string = '';
  libros: Libros[] = [];
  filteredLibros: Libros[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private librosService: SerivicosService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.loadingService.show();
    this.librosService.obtenerLibros().subscribe({
      next: (resp) => {
        this.libros = resp;
        this.filteredLibros = [...this.libros];
        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();

      }
    });
  }

  buscar() {
    if (this.searchTerm.trim() === '') {
      this.filteredLibros = [...this.libros];
      return;
    }

    const busqueda = this.searchTerm.toLowerCase();

    this.filteredLibros = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(busqueda) ||
      libro.autores.join(', ').toLowerCase().includes(busqueda)
    );
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredLibros = [...this.libros];
  }

 async editarLibro(libro: Libro) {
  const modal = await this.modalController.create({
    component: ModalRegistrarLibroComponent,
    componentProps: { libroEditar: libro },   
    cssClass: 'modal-registrar-libro',
    backdropDismiss: false
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data && data.libroActualizado) {
    const index = this.libros.findIndex(l => l.id === data.libroActualizado.id);

    if (index !== -1) {
      this.libros[index] = data.libroActualizado;
      this.buscar(); 
      this.cargarLibros();
    }
  }

}


  eliminarLibro(libro: Libro) {
  }

  async nuevoLibro() {
    const modal = await this.modalController.create({
      component: ModalRegistrarLibroComponent,
      cssClass: 'modal-registrar-libro',
      backdropDismiss: false
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.libro) {
      this.libros.push(data.libro);
      this.buscar();
      this.cargarLibros();

    }
  }
}
