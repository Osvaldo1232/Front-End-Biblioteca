import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Autor, Carrera, Categoria, Estudiante, Libro, Libros, LoginResponse, Prestamo, PrestamoCre, PrestamoCrear, PrestamoRespuesta } from '../modelos/LoginResponse';
@Injectable({
  providedIn: 'root'
})
export class SerivicosService {
  
 private baseUrl = 'http://localhost:8000';
private apiUrl = 'http://localhost:8000/prestamos';
 private baseUrP = 'http://localhost:8000/prestamos/detalles';

 private baseUrlLI = 'http://localhost:8000/libros';

 private baseUrlc = 'http://localhost:8000/carreras';
 private baseUrlA = 'http://localhost:8000/alumnos';
 private baseUrlC = 'http://localhost:8000/categorias';
 private baseUrlAu = 'http://localhost:8000/autores';


 crearCarrera(carrera: Carrera): Observable<Carrera> {
  return this.http.post<Carrera>(`${this.baseUrlc}`, carrera);
}

actualizarEstatus(id: string, estatus: string): Observable<any> {
  const url = `${this.baseUrlc}/${id}/estatus?estatus=${estatus}`;
  return this.http.patch(url, {}); 
}


actualizarCarrera(id: string, carrera: Carrera): Observable<Carrera> {
  return this.http.put<Carrera>(`${this.baseUrlc}/${id}`, carrera);
}

  obtenerCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.baseUrlc);
  }

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

    obtenerPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.baseUrP);
  }

  crearCategoria(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseUrlC, categoria);
  }

  actualizarCategoria(id: string, categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.baseUrlC}/${id}`, categoria);
  }
 registrarLibro(libro: any): Observable<any> {
    return this.http.post(`${this.baseUrlLI}`, libro);
  }

 actualizarLibro(id: string, payload: any) {
  return this.http.put(`${this.baseUrlLI}/${id}`, payload);
}

   obtenerLibros(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.baseUrlLI);
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

  registrarPrestamo(data: PrestamoCre): Observable<PrestamoRespuesta> {
    return this.http.post<PrestamoRespuesta>(this.apiUrl, data);
  }

  devolverPrestamo(idPrestamo: string, idLibro: string, cantidadDevuelta: number) {
  const url = `${this.apiUrl}/${idPrestamo}/devolver`;

  const params = {
    cantidadDevuelta: cantidadDevuelta,
    idLibro: idLibro
  };

  return this.http.put(url, null, { params });
}

 buscarPrestamos(
    fechaPrestamo: string,
    alumnoNombre: string,
    libroTitulo: string,
    
    estatus: string = 'VENCIDO'
  ): Observable<any> {

    let params = new HttpParams();

    if (fechaPrestamo) params = params.set('fechaPrestamo', fechaPrestamo);
    if (alumnoNombre) params = params.set('alumnoNombre', alumnoNombre);
    if (libroTitulo) params = params.set('libroTitulo', libroTitulo);
    if (estatus) params = params.set('estatus', estatus);

    return this.http.get(`${this.apiUrl}/buscar`, { params });
  }
}
