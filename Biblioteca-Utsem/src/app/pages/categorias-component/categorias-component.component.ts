import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ModalesRegistrarCategoriaComponent } from '../components/modales-registrar-categoria/modales-registrar-categoria.component';

interface Categoria {
  id: string;
  nombre: string;
}

@Component({
 selector: 'app-categorias-component',
  templateUrl: './categorias-component.component.html',
  styleUrls: ['./categorias-component.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CategoriasComponentComponent implements OnInit {
  searchTerm: string = '';

  categorias: Categoria[] = [
    { id: 'C-001', nombre: 'Infantil' },
    { id: 'C-002', nombre: 'Juvenil' },
    { id: 'C-003', nombre: 'Fantasía' },
    { id: 'C-004', nombre: 'Terror' },
    { id: 'C-005', nombre: 'Romance' },
    { id: 'C-006', nombre: 'Educativo' },
    { id: 'C-007', nombre: 'Ciencia ficción' },
  ];

  filteredCategorias: Categoria[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.filteredCategorias = [...this.categorias];
  }

  buscar() {
    if (this.searchTerm.trim() === '') {
      this.filteredCategorias = [...this.categorias];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCategorias = this.categorias.filter(
        c =>
          c.id.toLowerCase().includes(term) ||
          c.nombre.toLowerCase().includes(term)
      );
    }
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredCategorias = [...this.categorias];
  }

  editarCategoria(categoria: Categoria) {
    console.log('Editar categoría:', categoria);
  }

  eliminarCategoria(categoria: Categoria) {
    console.log('Eliminar categoría:', categoria);
  }

async nuevaCategoria() {
  const modal = await this.modalController.create({
    component: ModalesRegistrarCategoriaComponent,
    cssClass: 'modal-registrar-categoria',
    backdropDismiss: false
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if (data && data.categoria) {
    // Agregar la nueva categoría
    this.categorias.push(data.categoria);
    this.buscar(); // Actualizar la lista si tienes filtrado

    // Mostrar mensaje de éxito
    const toast = await this.toastController.create({
      message: 'Categoría registrada correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
  }
}
