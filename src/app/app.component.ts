import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './providers/login.service';
import { Router } from '@angular/router';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frutas';
  usuario: Usuario;
  constructor(private loginService: LoginService, private router: Router) {

  }

 ngOnInit() {

 }

 sesion(): boolean {
  console.trace('isLogged LoginService');
  if (!this.loginService.isLogged()) {
    return false;
  }
  return true;
}

 logOut(){
   this.loginService.logout();
   this.router.navigate(['login']);
 }
 
}
