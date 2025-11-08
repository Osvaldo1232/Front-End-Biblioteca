import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController , ModalController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalesRegistrarAutoresComponent } from '../components/modales-registrar-autores/modales-registrar-autores.component';
interface Autor {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nacionalidad: string;
}

@Component({
  selector: 'app-autores-component',
  templateUrl: './autores-component.component.html',
  styleUrls: ['./autores-component.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class AutoresComponentComponent implements OnInit {
  searchTerm: string = '';

  autores: Autor[] = [
    { id: 'A-001', nombre: 'Gabriel', apellidoPaterno: 'García', apellidoMaterno: 'Márquez', nacionalidad: 'Colombiana' },
    { id: 'A-002', nombre: 'Isabel', apellidoPaterno: 'Allende', apellidoMaterno: '', nacionalidad: 'Chilena' },
    { id: 'A-003', nombre: 'Julio', apellidoPaterno: 'Cortázar', apellidoMaterno: '', nacionalidad: 'Argentina' },
    { id: 'A-004', nombre: 'Mario', apellidoPaterno: 'Vargas', apellidoMaterno: 'Llosa', nacionalidad: 'Peruana' },
    { id: 'A-005', nombre: 'Laura', apellidoPaterno: 'Esquivel', apellidoMaterno: '', nacionalidad: 'Mexicana' },
  ];

  filteredAutores: Autor[] = [];

  constructor(private toastController: ToastController,  private modalController: ModalController,) {}

  ngOnInit() {
    this.filteredAutores = [...this.autores];
  }

  buscar() {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      this.filteredAutores = [...this.autores];
    } else {
      this.filteredAutores = this.autores.filter(
        a =>
          a.nombre.toLowerCase().includes(term) ||
          a.apellidoPaterno.toLowerCase().includes(term) ||
          a.apellidoMaterno.toLowerCase().includes(term) ||
          a.nacionalidad.toLowerCase().includes(term)
      );
    }
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredAutores = [...this.autores];
  }

  editarAutor(autor: Autor) {
    console.log('Editar autor:', autor);
  }

  eliminarAutor(autor: Autor) {
    console.log('Eliminar autor:', autor);
  }

async nuevoAutor() {
  const modal = await this.modalController.create({
    component: ModalesRegistrarAutoresComponent,
    cssClass: 'modal-registrar-autor',
    backdropDismiss: false
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data && data.autor) {
    // Agregar el nuevo autor
    this.autores.push(data.autor);
    this.buscar(); // Si tienes un método para filtrar o actualizar la tabla

    // Mostrar mensaje de éxito
    const toast = await this.toastController.create({
      message: 'Autor registrado correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

}
}
