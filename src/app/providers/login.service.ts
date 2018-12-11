import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';


const USUARIO_NOMBRE = 'admin';
const USUARIO_PASSWORD = '12345678';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  usuario: Usuario;



  constructor() {
    console.trace('constructor LoginService');
    this.usuario = undefined;
  }

  isLogged(): boolean {
    console.trace('isLogged LoginService');
    if (this.usuario) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    console.trace('logout LoginService');
    this.usuario = undefined;
  }

  login(u: Usuario):boolean{
    console.trace('login LoginService %o', u);
    if(u && u.nombre=== USUARIO_NOMBRE && u.password===USUARIO_PASSWORD){
      console.debug(' usuario logeado');
      this.usuario= u;
      return true;
    }else{
      console.warn('usuario no logeado');
      this.usuario=undefined;
      return false;
    }
  }

}