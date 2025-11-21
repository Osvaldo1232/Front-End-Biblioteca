import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertService } from 'src/app/shared/alert-service';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { Carrera, Combo, Estudiante } from 'src/app/modelos/LoginResponse';

@Component({
  selector: 'app-modal-registrar-estudiante',
  templateUrl: './modal-registrar-estudiante.component.html',
  styleUrls: ['./modal-registrar-estudiante.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ModalRegistrarEstudianteComponent implements OnInit {

  @Input() estudiante: any = {
    id: null,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    matricula: '',
    carreraId: '',
    carreraNombre: '',
    estatus: 'ACTIVO'
  };

  carreras: Combo[] = [];

  constructor(
    private modalController: ModalController,
    private estudiantesService: SerivicosService,
    private alertService: AlertService
  ) {}
 ngOnInit() {
    this.cargarCarreras();
  }

  cargarCarreras() {
    this.estudiantesService.obtenerCarrerasA().subscribe({
      next: (data) => {
        this.carreras = data;
        console.log( this.carreras, " this.carreras")
      },
      error: (err) => {
        console.error('Error al cargar carreras:', err);
        this.alertService.show('No se pudieron cargar las carreras', 'danger', 'Error');
      }
    });
  }
  cerrarModal() {
    this.modalController.dismiss();
  }

  aceptar() {
    const estudiantePayload: Estudiante = {
      id: this.estudiante.id,
      nombre: this.estudiante.nombre,
      apellidoPaterno: this.estudiante.apellidoPaterno,
      apellidoMaterno: this.estudiante.apellidoMaterno,
      matricula: this.estudiante.matricula,
      carreraId: this.estudiante.carreraId,
      carreraNombre: this.obtenerCarreraNombre(this.estudiante.carreraId),
      estatus: this.estudiante.estatus || 'ACTIVO'
    };

    if (this.estudiante.id) {
      // Editar estudiante
      this.estudiantesService.actualizarEstudiante(this.estudiante.id, estudiantePayload)
        .subscribe({
          next: (resp) => {
            this.alertService.show(
              'El estudiante se actualizó correctamente',
              'success',
              'Éxito'
            );
            this.modalController.dismiss({ estudiante: resp });
          },
          error: (err) => {
            if(err.status==500){
            this.alertService.show(err.error.error, 'danger', 'Error');

            }
          }
        });
    } else {
      // Crear estudiante
      this.estudiantesService.crearEstudiante(estudiantePayload)
        .subscribe({
          next: (resp) => {
            this.alertService.show(
              'El estudiante se registró correctamente',
              'success',
              'Éxito'
            );
            this.modalController.dismiss({ estudiante: resp });
          },
          error: (err) => {
            if(err.status==500){
            this.alertService.show(err.error.error, 'danger', 'Error');

            }
          }
        });
    }
  }

  private obtenerCarreraNombre(carreraId: string): string {
    const carrera = this.carreras.find(c => c.id === carreraId);
    return carrera ? carrera.titulo : '';
  }
}
