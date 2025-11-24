import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { PrestamoFecha } from 'src/app/modelos/LoginResponse';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-libros-por-fecha',
  templateUrl: './libros-por-fecha.page.html',
  styleUrls: ['./libros-por-fecha.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LibrosPorFechaPage implements OnInit {

  @ViewChild('barCanvas', { static: false }) barCanvas!: ElementRef;
  barChart: any;

  constructor(private service: SerivicosService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.service.obtenerTop10Fechas().subscribe({
      next: (data: PrestamoFecha[]) => {
        const labels = data.map(x => `${x.libro}\n${x.fecha}`);
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
                  callback: function(value) {
                    const index = Number(value);
                    return this.getLabelForValue(index).split('\n');
                  }
                }
              }
            }
          }
        });
      }
    });
  }
}
