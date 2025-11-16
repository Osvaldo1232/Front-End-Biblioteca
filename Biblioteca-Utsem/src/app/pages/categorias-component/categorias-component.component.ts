import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ModalesRegistrarCategoriaComponent } from '../components/modales-registrar-categoria/modales-registrar-categoria.component';
import { Categoria } from 'src/app/modelos/LoginResponse';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Loading } from 'src/app/shared/loading/loading';
import { LoadingService } from 'src/app/shared/loading-service';

@Component({
  selector: 'app-categorias-component',
  templateUrl: './categorias-component.component.html',
  styleUrls: ['./categorias-component.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, Loading],
})
export class CategoriasComponentComponent implements OnInit {
  searchTerm: string = '';
  categorias: Categoria[] = [];
  filteredCategorias: Categoria[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private categoriasService: SerivicosService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.loadingService.show();
    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.filteredCategorias = [...data];
        this.loadingService.hide();
      },
      error: async () => {
               this.loadingService.hide();

      },
    });
  }

  buscar() {
    if (this.searchTerm.trim() === '') {
      this.filteredCategorias = [...this.categorias];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCategorias = this.categorias.filter(c =>
        c.nombre.toLowerCase().includes(term)
      );
    }
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredCategorias = [...this.categorias];
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
      this.categorias.push(data.categoria);
      this.buscar();
    }
  }

  async editarCategoria(categoria: Categoria) {
    const modal = await this.modalController.create({
      component: ModalesRegistrarCategoriaComponent,
      componentProps: { categoria: { ...categoria } }, 
      cssClass: 'modal-registrar-categoria',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.categoria) {
      // Actualiza la lista local
      const index = this.categorias.findIndex(c => c.id === data.categoria.id);
      if (index !== -1) {
        this.categorias[index] = data.categoria;
      }
      this.buscar();
    }
  }
}
