import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController, ToastController ,ModalController } from '@ionic/angular';
import { ModalRegistrarEstudianteComponent } from '../components/estudiantes-registrados/modal-registrar-estudiante/modal-registrar-estudiante.component';
interface Estudiante {
  matricula: string;
  nombre: string;
  apellidos: string;
  carrera: string;
}

@Component({
  selector: 'app-estudiantes-registrados',
  templateUrl: './estudiantes-registrados.page.html',
  styleUrls: ['./estudiantes-registrados.page.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class EstudiantesRegistradosPage implements OnInit {

 estudiantes: Estudiante[] = [];
  estudiantesFiltrados: Estudiante[] = [];
  busqueda: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    // Datos de ejemplo - reemplazar con servicio real
    this.estudiantes = [
      { matricula: '262310136', nombre: 'Luis Angel', apellidos: 'Perez Garcia', carrera: 'Tics' },
      { matricula: '262310098', nombre: 'Osvaldo', apellidos: 'Garcia Mendoza', carrera: 'Mecatronica' },
      { matricula: '262310278', nombre: 'Erika', apellidos: 'Perez Garcia', carrera: 'Lengua Inglesa' },
      { matricula: '262310189', nombre: 'Kevin Antonio', apellidos: 'Hernandez Garcia', carrera: 'Contabilidad' },
      { matricula: '263310122', nombre: 'Ivan', apellidos: 'Florencio Jeronimo', carrera: 'Administración' },
      { matricula: '262310130', nombre: 'Karen Elizabeth', apellidos: 'Velazquez Garcia', carrera: 'Tics' },
      { matricula: '262310090', nombre: 'Valeria', apellidos: 'Garcia Mendoza', carrera: 'Enfermeria' },
      { matricula: '262310100', nombre: 'Macarena', apellidos: 'Garza Garcia', carrera: 'Lengua Inglesa' },
      { matricula: '262310056', nombre: 'Osvaldo', apellidos: 'Perez Puncos', carrera: 'Mecatronica' },
      { matricula: '262310045', nombre: 'Diana', apellidos: 'Gonzalez Gomez', carrera: 'Contabilidad' },
    ];
    this.estudiantesFiltrados = [...this.estudiantes];
  }

  buscarEstudiante() {
    if (this.busqueda.trim() === '') {
      this.estudiantesFiltrados = [...this.estudiantes];
    } else {
      const termino = this.busqueda.toLowerCase();
      this.estudiantesFiltrados = this.estudiantes.filter(estudiante =>
        estudiante.matricula.toLowerCase().includes(termino) ||
        estudiante.nombre.toLowerCase().includes(termino) ||
        estudiante.apellidos.toLowerCase().includes(termino) ||
        estudiante.carrera.toLowerCase().includes(termino)
      );
    }
  }

  limpiarBusqueda() {
    this.busqueda = '';
    this.estudiantesFiltrados = [...this.estudiantes];
  }

  async editarEstudiante(estudiante: Estudiante) {
    // Implementar navegación o modal para editar
    const toast = await this.toastController.create({
      message: `Editar estudiante: ${estudiante.nombre} ${estudiante.apellidos}`,
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  async eliminarEstudiante(estudiante: Estudiante) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro que desea eliminar al estudiante ${estudiante.nombre} ${estudiante.apellidos}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            this.estudiantes = this.estudiantes.filter(e => e.matricula !== estudiante.matricula);
            this.buscarEstudiante();
            
            const toast = await this.toastController.create({
              message: 'Estudiante eliminado correctamente',
              duration: 2000,
              position: 'bottom',
              color: 'success'
            });
            toast.present();
          },
        },
      ],
    });

    await alert.present();
  }

  
  async agregarNuevo() {
    const modal = await this.modalController.create({
      component: ModalRegistrarEstudianteComponent,
      cssClass: 'modal-registrar-estudiante',
      backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.estudiante) {
      // Agregar el nuevo estudiante
      this.estudiantes.push(data.estudiante);
      this.buscarEstudiante();

      // Mostrar mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Estudiante registrado correctamente',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      toast.present();
    }
  }
}
