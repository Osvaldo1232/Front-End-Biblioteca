import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import Chart from 'chart.js/auto';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { TopLibros } from 'src/app/modelos/LoginResponse';
import { Loading } from 'src/app/shared/loading/loading';
import { LoadingService } from 'src/app/shared/loading-service';

@Component({
  selector: 'app-libros-mas-prestados',
  templateUrl: './libros-mas-prestados.page.html',
  styleUrls: ['./libros-mas-prestados.page.scss'],
  standalone: true,
  imports: [Loading, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LibrosMasPrestadosPage implements OnInit {

  @ViewChild('barCanvas', { static: false }) barCanvas!: ElementRef;
  barChart: any;
leyenda: any[] = [];
  constructor(private service: SerivicosService,     private loadingService: LoadingService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  // Plugin para mostrar valores encima de cada barra
 mostrarValoresPlugin = {
  id: 'mostrarValores',
  afterDatasetsDraw(chart: any) {
    const ctx = chart.ctx;

    chart.data.datasets.forEach((dataset: any, i: number) => {
      const meta = chart.getDatasetMeta(i);

      meta.data.forEach((bar: any, index: number) => {
        const valor = dataset.data[index];

        ctx.fillStyle = "#000"; // color del texto
        ctx.font = "12px Arial";
        ctx.textAlign = "center";

        const x = bar.x;
        const y = bar.y - 5; // arriba de la barra

        ctx.fillText(valor, x, y);
      });
    });
  }
};


  cargarDatos() {
    this.loadingService.show();

    this.service.obtenerTop10Libros().subscribe({
      next: (data: TopLibros[]) => {
this.loadingService.hide();
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
          },

           plugins: [this.mostrarValoresPlugin]
        });

      }
    });
  }

}
