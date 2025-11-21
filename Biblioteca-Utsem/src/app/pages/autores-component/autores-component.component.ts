import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalesRegistrarAutoresComponent } from '../components/modales-registrar-autores/modales-registrar-autores.component';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Autor } from 'src/app/modelos/LoginResponse';
import { LoadingService } from 'src/app/shared/loading-service';
import { Loading } from 'src/app/shared/loading/loading';

@Component({
  selector: 'app-autores-component',
  templateUrl: './autores-component.component.html',
  styleUrls: ['./autores-component.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, Loading],
})
export class AutoresComponentComponent implements OnInit {

  searchTerm: string = '';
  autores: Autor[] = [];
  filteredAutores: Autor[] = [];

  // 📌 PAGINACIÓN
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private modalController: ModalController,
    private autoresService: SerivicosService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.cargarAutores();
  }

  cargarAutores() {
    this.loadingService.show();
    this.autoresService.obtenerAutores().subscribe({
      next: (data) => {
        this.autores = data;
        this.filteredAutores = [...data];
        this.actualizarPaginacion();
        this.loadingService.hide();
      },
      error: async () => {
        this.loadingService.hide();
      },
    });
  }

  // 👉 LISTA PAGINADA
  get autoresPaginados() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredAutores.slice(start, end);
  }

  actualizarPaginacion() {
    this.totalPages = Math.ceil(this.filteredAutores.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  buscar() {
    if (this.searchTerm.trim() === '') {
      this.filteredAutores = [...this.autores];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredAutores = this.autores.filter(a =>
        a.nombre.toLowerCase().includes(term) ||
        a.apellidoPaterno.toLowerCase().includes(term) ||
        a.apellidoMaterno.toLowerCase().includes(term) ||
        a.nacionalidad.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1;
    this.actualizarPaginacion();
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredAutores = [...this.autores];
    this.currentPage = 1;
    this.actualizarPaginacion();
  }

  async nuevoAutor() {
    const modal = await this.modalController.create({
      component: ModalesRegistrarAutoresComponent,
      cssClass: 'modal-registrar-autor',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.autor) {
      this.autores.push(data.autor);
      this.buscar();
    }
  }

  async editarAutor(autor: Autor) {
    const modal = await this.modalController.create({
      component: ModalesRegistrarAutoresComponent,
      componentProps: { autor: { ...autor } },
      cssClass: 'modal-registrar-autor',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.autor) {
      const index = this.autores.findIndex(a => a.id === data.autor.id);
      if (index !== -1) this.autores[index] = data.autor;

      this.buscar();
    }
  }
}
