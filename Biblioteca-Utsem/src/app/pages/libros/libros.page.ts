import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ModalRegistrarLibroComponent } from '../components/estudiantes-registrados/modal-registrar-libro/modal-registrar-libro.component';
// Ajusta la ruta según tu proyecto

interface Libro {
  titulo: string;
  autor: string;
  anoPublicacion: number;
  editorial: string;
  disponibles: number;
  estatus: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LibrosPage implements OnInit {
  searchTerm: string = '';
 libros: Libro[] = [ { titulo: 'Bajo la misma Estrella', autor: 'Luis Angel', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Activo' }, { titulo: 'Atravez de mi ventana', autor: 'Osvaldo', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Inactivo' }, { titulo: 'Antes de Dociembre', autor: 'Erika', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Activo' }, { titulo: 'Despues de Diciembre', autor: 'Kevin Antonio', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Activo' }, { titulo: 'A dos metros de ti', autor: 'Ivan', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Inactivo' }, { titulo: 'Despues del mar', autor: 'Karen Elizabeth', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Activo' }, { titulo: 'Culpa Mia', autor: 'Valeria', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Activo' }, { titulo: 'Culpa Tuya', autor: 'Macarena', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Inactivo' }, { titulo: 'Culpa Nuestra', autor: 'Osvaldo', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Activo' }, { titulo: 'Invisible', autor: 'Diana', anoPublicacion: 2019, editorial: 'The Fault in Our Stars', disponibles: 100, estatus: 'Activo' } ];
  filteredLibros: Libro[] = [];

  constructor(private modalController: ModalController, private toastController: ToastController) {}

  ngOnInit() {
    this.filteredLibros = [...this.libros];
  }

  buscar() {
    if (this.searchTerm.trim() === '') {
      this.filteredLibros = [...this.libros];
    } else {
      this.filteredLibros = this.libros.filter(libro =>
        libro.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        libro.autor.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredLibros = [...this.libros];
  }

  editarLibro(libro: Libro) { console.log('Editar libro:', libro); }
  eliminarLibro(libro: Libro) { console.log('Eliminar libro:', libro); }

  // ----------- Nuevo método para agregar libro -----------
  async nuevoLibro() {
    const modal = await this.modalController.create({
      component: ModalRegistrarLibroComponent,
      cssClass: 'modal-registrar-libro',
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.libro) {
      // Agregar el nuevo libro
      this.libros.push(data.libro);
      this.buscar(); // Actualizar la lista filtrada

      // Mostrar mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Libro registrado correctamente',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    }
  }
}
