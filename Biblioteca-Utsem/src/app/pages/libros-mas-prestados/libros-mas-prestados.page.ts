import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonIcon, IonTitle, IonToolbar , IonButtons, IonButton} from '@ionic/angular/standalone';
import Chart from 'chart.js/auto';
import { SerivicosService } from 'src/app/Servicios/serivicos-service';
import { TopLibros } from 'src/app/modelos/LoginResponse';
import { Loading } from 'src/app/shared/loading/loading';
import { LoadingService } from 'src/app/shared/loading-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-libros-mas-prestados',
  templateUrl: './libros-mas-prestados.page.html',
  styleUrls: ['./libros-mas-prestados.page.scss'],
  standalone: true,
  imports: [Loading, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon]
})
export class LibrosMasPrestadosPage implements OnInit {
@ViewChild('graficaContainer', { static: false }) graficaContainer!: ElementRef;

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

             layout: {
      padding: {
        top: 70 // Más espacio arriba
      }
    },
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


  async exportarPDF() {
  const element = this.graficaContainer.nativeElement;

  // Convertir a imagen usando html2canvas
  const canvas = await html2canvas(element, {
    scale: 3, // mayor resolución
    useCORS: true
  });

  const imgData = canvas.toDataURL('image/png');

  // Crear PDF en formato vertical tamaño carta
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Ajustar imagen para que llene toda la hoja
  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

  pdf.save('grafica-prestamos.pdf');
}

}

