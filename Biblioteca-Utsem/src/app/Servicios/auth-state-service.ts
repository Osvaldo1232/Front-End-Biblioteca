import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
    
  private usuario: any = null;

  setUsuario(data: any) {
    this.usuario = data;
  }

  getUsuario() {
    return this.usuario;
  }
}
