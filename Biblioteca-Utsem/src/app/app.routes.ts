import { Routes } from '@angular/router';
import { InicioPage } from './pages/inicio/inicio.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'inicio',
    component: InicioPage, // Layout con sidebar + header
    children: [

      { path: '', redirectTo: 'carreras', pathMatch: 'full' },
      { path: 'estudiantes-registrados', loadComponent: () => import('./pages/estudiantes-registrados/estudiantes-registrados.page').then(m => m.EstudiantesRegistradosPage) },
      { path: 'carreras', loadComponent: () => import('./pages/carreras/carreras.page').then(m => m.CarrerasPage) },
      { path: 'libros', loadComponent: () => import('./pages/libros/libros.page').then(m => m.LibrosPage) },
      { path: 'prestamos', loadComponent: () => import('./pages/prestamos/prestamos.page').then(m => m.PrestamosPage) },
      { path: 'prestamos-vencidos', loadComponent: () => import('./pages/prestamos-vencidos/prestamos-vencidos.page').then(m => m.PrestamosVencidosPage) },
      { 
    path: 'categorias', 
    loadComponent: () => import('./pages/categorias-component/categorias-component.component')
      .then(m => m.CategoriasComponentComponent) 
  },

  { 
    path: 'autores', 
    loadComponent: () => import('./pages/autores-component/autores-component.component')
      .then(m => m.AutoresComponentComponent) 
  }
    ]
  }
];
