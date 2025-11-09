import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Autor, Carrera, Categoria, Estudiante, LoginResponse } from '../modelos/LoginResponse';




@Injectable({
  providedIn: 'root'
})
export class SerivicosService {
  
 private baseUrl = 'http://localhost:8000';
 private baseUrlc = 'http://localhost:8000/carreras';
 private baseUrlA = 'http://localhost:8000/alumnos';
   private baseUrlC = 'http://localhost:8000/categorias';
   private baseUrlAu = 'http://localhost:8000/autores';



 crearCarrera(carrera: Carrera): Observable<Carrera> {
  return this.http.post<Carrera>(`${this.baseUrlc}`, carrera);
}


actualizarEstatus(id: string, estatus: string): Observable<any> {
  const url = `${this.baseUrlc}/${id}/estatus?estatus=${estatus}`;
  return this.http.patch(url, {}); // PATCH sin body, solo con query param
}


actualizarCarrera(id: string, carrera: Carrera): Observable<Carrera> {
  return this.http.put<Carrera>(`${this.baseUrlc}/${id}`, carrera);
}

  // Obtener todas las carreras (opcional)
  obtenerCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.baseUrlc);
  }

  // Obtener una carrera por ID (opcional)
  obtenerCarreraPorId(id: string): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.baseUrl}/${id}`);
  }

  

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.baseUrl}/Autenticacion/login`, body)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('rol', res.rol);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  


  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrlA);
  }

  crearEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.baseUrlA, estudiante);
  }

  actualizarEstudiante(id: string, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.baseUrlA}/${id}`, estudiante);
  }



  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrlC);
  }

  crearCategoria(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrlC, categoria);
  }

  actualizarCategoria(id: string, categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.baseUrlC}/${id}`, categoria);
  }




  obtenerAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.baseUrlAu);
  }

  crearAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.baseUrlAu, autor);
  }

  actualizarAutor(id: string, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.baseUrlAu}/${id}`, autor);
  }
}
