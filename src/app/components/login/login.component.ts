import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  mensaje: string;

  constructor(private loginService: LoginService, private router: Router) {
    console.trace('constructor LoginComponent');
    this.mensaje = "";
    this.crearFormulario();
  }

  ngOnInit() {
    console.trace('ngOnInit LoginComponent');
  }

  private crearFormulario() {
    console.trace('crearFormulario LoginComponent');
    this.formulario = new FormGroup({
      nombre: new FormControl('admin', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      password: new FormControl('12345678', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    });
  }

  sumitar() {
    console.trace('sumitar LoginComponent %o', this.formulario);
    //TODO llamar al LoginService
    let nombre = this.formulario.controls.nombre.value;
    let password = this.formulario.controls.password.value;
    console.debug(`nombre=${nombre} password=${password}`);
    let u = new Usuario;
    u.nombre = nombre;
    u.password = password;

    if (this.loginService.login(u)) {
      this.router.navigate(['listado']);
    } else {
      this.mensaje = "Credenciales no validados. Por favor prueba de nuevo.";
    }

  }

}