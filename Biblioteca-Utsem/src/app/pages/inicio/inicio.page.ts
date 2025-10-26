import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule]
})
export class InicioPage implements OnInit {

  

  ngOnInit() {
  }
constructor( private router: Router) {}
sidebarVisible: boolean = true; 

   logout() {
    this.router.navigate(['/home']);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
