import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/alert-service';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Autor, Categoria } from 'src/app/modelos/LoginResponse';

@Component({
  selector: 'app-modal-registrar-libro',
  templateUrl: './modal-registrar-libro.component.html',
  styleUrls: ['./modal-registrar-libro.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ModalRegistrarLibroComponent implements OnInit {

  @Input() libroEditar: any = null;

  categorias: Categoria[] = [];
  autores: Autor[] = [];

  libro = {
    titulo: '',
    autores: [],
    categoria: null,
    anioPublicacion: null,
    editorial: '',
    copiasDisponibles: '',
    estatus: true
  };

  currentYear = new Date().getFullYear();

  constructor(
    private modalController: ModalController,
    private servicio: SerivicosService,
    private alerta: AlertService
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarAutores();

    if (this.libroEditar) {
      this.cargarDatosParaEditar();
    }
  }

  cargarDatosParaEditar() {
    this.libro = {
      titulo: this.libroEditar.titulo,
      autores: this.libroEditar.autoresIds || [],
      categoria: this.libroEditar.categoriaId,
      anioPublicacion: this.libroEditar.anioPublicacion,
      editorial: this.libroEditar.editorial,
      copiasDisponibles: this.libroEditar.copiasDisponibles,
      estatus: this.libroEditar.estatus === 'ACTIVO'
    };
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  aceptar() {
    if (!this.libro.titulo || this.libro.autores.length === 0 ||
        !this.libro.categoria || !this.libro.anioPublicacion ||
        !this.libro.editorial || !this.libro.copiasDisponibles) {
      this.alerta.show('Todos los campos son obligatorios', 'warning', 'Error');
      return;
    }

    const payload = {
      id: this.libroEditar ? this.libroEditar.id : null,
      titulo: this.libro.titulo,
      autoresIds: this.libro.autores,
      categoriaId: this.libro.categoria,
      anioPublicacion: Number(this.libro.anioPublicacion),
      editorial: this.libro.editorial,
      copiasDisponibles: Number(this.libro.copiasDisponibles),
      estatus: this.libro.estatus ? 'ACTIVO' : 'INACTIVO'
    };

    if (this.libroEditar) {
      this.servicio.actualizarLibro(this.libroEditar.id, payload).subscribe({
        next: () => {
          this.alerta.show('Libro actualizado con éxito', 'success', 'Éxito');
          this.modalController.dismiss({ libroActualizado: payload });
        },
        error: () => {
          this.alerta.show('Error al actualizar libro', 'danger', 'Error');
        }
      });
      return;
    }

    this.servicio.registrarLibro(payload).subscribe({
      next: () => {
        this.alerta.show('Libro registrado con éxito', 'success', 'Éxito');
        this.modalController.dismiss({ libro: payload });
      },
      error: () => {
        this.alerta.show('Error al crear libro', 'danger', 'Error');
      }
    });
  }

  cargarCategorias() {
    this.servicio.obtenerCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (e) => console.error(e)
    });
  }

  cargarAutores() {
    this.servicio.obtenerAutores().subscribe({
      next: (data) => this.autores = data,
      error: (e) => console.error(e)
    });
  }


  mapearAutoresAIds(nombres: string[]) {
  return this.autores
    .filter(a => nombres.includes(a.nombre))
    .map(a => a.id);
}

}
