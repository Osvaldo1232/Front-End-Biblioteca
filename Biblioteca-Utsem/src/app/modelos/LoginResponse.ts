
export interface LoginResponse {
  uuid: string;
  rol: string;
  token: string;
}

export interface Carrera {
  id?: string;      // opcional al crear
  nombre: string;
  estatus: string;  // "ACTIVO" o "INACTIVO"
  activo?: boolean;
}


export interface Estudiante {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
  carreraId: string;
  carreraNombre: string;
  estatus: string; // "ACTIVO" o "INACTIVO"
}


export interface Estudiante {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
  carreraId: string;
  carreraNombre: string;
  estatus: string; // ACTIVO o INACTIVO
}
export interface Autor {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nacionalidad: string;
}


export interface Categoria {
  id?: string;
  nombre: string;
}


export interface Libro {
  id: string;
  titulo: string;
  autores: string[];           // ← array de strings
  anioPublicacion: number;
  editorial: string;
  copiasDisponibles: number;
  categoriaId: string;
  categoriaNombre: string;
  estatus: string;             // ACTIVO | INACTIVO
}


export interface Libros {
  id: string;
  titulo: string;
  autores: string[];               // Lista de nombres
  anioPublicacion: number;
  editorial: string;
  copiasDisponibles: number;
  categoriaId: string;
  categoriaNombre: string;
  estatus: 'ACTIVO' | 'INACTIVO';
}
