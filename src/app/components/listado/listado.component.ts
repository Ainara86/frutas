import { Component, OnInit } from '@angular/core';
import { Fruta } from 'src/app/model/fruta';
import { FrutaService } from 'src/app/providers/fruta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  frutas: Fruta[];
  frutaDetalle: Fruta;
  idFruta: number;
  todas: boolean;
  nombreBuscar: string;
mensaje: string;

  constructor(public frutaService: FrutaService, public router: Router) {
    console.trace('ListadoFrutasComponent constructor');
    this.frutas = [];
    this.todas = false;
    this.mensaje="";
  }

  ngOnInit() {
    console.trace('ListadoFrutasComponent ngOnInit');
    this.recargarLista();
  }

  recargarLista() {
    console.log('CrudFrutasComponent recargarLista');
    this.frutaService.getAll().subscribe(data => {
      console.debug('Datos recibidos $%o', data);
      this.frutas = data.map(el => el);
    });
  }

  filtrar(filtro: number) {
    console.trace('TareaComponent filtrar ' + this.todas);
    if (filtro === 0) {
      this.todas = true;
    } else {
      this.todas = false;
    }
  }

  eliminar(id: number) {
    console.debug(`formularioComponent eliminar ${id}`);
    this.frutaService.delete(id).subscribe(data => {
      console.debug('Datos recibidos %o', data);
      this.recargarLista();
    });
    this.mensaje="Fruta eliminada correctamente";
  }
}