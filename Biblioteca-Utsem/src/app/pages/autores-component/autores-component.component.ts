import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
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
  imports: [CommonModule, FormsModule, IonicModule,Loading],
})
export class AutoresComponentComponent implements OnInit {
  searchTerm: string = '';
  autores: Autor[] = [];
  filteredAutores: Autor[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
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
        this.loadingService.hide();
      },
      error: async () => {
                this.loadingService.hide();

      },
    });
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
  }

  limpiar() {
    this.searchTerm = '';
    this.filteredAutores = [...this.autores];
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
      if (index !== -1) {
        this.autores[index] = data.autor;
      }
      this.buscar();
    }
  }

  
}
