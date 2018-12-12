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
 
  //Filtro de ofertas
  todas:boolean;
  ofertaFiltro: string;
  nombreBuscar: string;

  mensaje: string;

  constructor(public frutaService: FrutaService, public router: Router) {
    console.trace('ListadoFrutasComponent constructor');
    this.frutas = [];
    this.todas=true;
    this.ofertaFiltro='Todas';
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

  filtrar(){
    this.todas= !this.todas;
    this.ofertaFiltro=(this.todas)?'Todas':'Ofertas';
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