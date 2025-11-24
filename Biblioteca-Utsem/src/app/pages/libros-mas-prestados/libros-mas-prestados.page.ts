import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import Chart from 'chart.js/auto';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { TopLibros } from 'src/app/modelos/LoginResponse';

@Component({
  selector: 'app-libros-mas-prestados',
  templateUrl: './libros-mas-prestados.page.html',
  styleUrls: ['./libros-mas-prestados.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LibrosMasPrestadosPage implements OnInit {

  @ViewChild('barCanvas', { static: false }) barCanvas!: ElementRef;
  barChart: any;

  constructor(private service: SerivicosService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.service.obtenerTop10Libros().subscribe({
      next: (data: TopLibros[]) => {

        const labels = data.map(x => x.nombreLibro);
        const totales = data.map(x => x.totalPrestamos);

        const colores = totales.map(() =>
          `hsl(${Math.floor(Math.random() * 360)}, 70%, 55%)`
        );

        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Total de préstamos',
              data: totales,
              backgroundColor: colores
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { precision: 0 }
              },
              x: {
                ticks: {
                  maxRotation: 65,
                  minRotation: 45
                }
              }
            }
          }
        });

      }
    });
  }

}
