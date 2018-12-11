import { Component, OnInit } from '@angular/core';
import { Fruta } from 'src/app/model/fruta';
import { FrutaService } from 'src/app/providers/fruta.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit { 
 frutas: Fruta[]; 
 fruta : Fruta;
 mensaje:string;

 constructor(public frutaService: FrutaService, private route: ActivatedRoute) { 
    console.trace('FormularioComponent constructor');
    this.fruta = new Fruta();
    this.mensaje="";

  }

  ngOnInit() {
    console.trace('FormularioComponent ngOnInit');
    this.cargarFrutas(); 
  }
  cargarFrutas() {
    this.frutaService.getAll().subscribe(data => {
      console.debug('Datos recibidos %o', data);
      this.frutas = data.map(el => el);
    });
  }

  eliminar(id: number) {
    console.debug(`formularioComponent eliminar ${id}`);
    this.frutaService.delete(id).subscribe(data => {
      console.debug('Datos recibidos %o', data);
      this.cargarFrutas();
    });
    this.mensaje="Fruta eliminada correctamente";
  }


}
