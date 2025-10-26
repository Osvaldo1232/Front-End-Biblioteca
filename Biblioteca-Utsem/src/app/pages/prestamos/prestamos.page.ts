import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.page.html',
  styleUrls: ['./prestamos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrestamosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
