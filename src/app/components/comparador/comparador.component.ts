import { Component, OnInit } from '@angular/core';
import { Fruta } from 'src/app/model/fruta';
import { FrutaService } from 'src/app/providers/fruta.service';

@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.scss']
})
export class ComparadorComponent implements OnInit {
    frutas: Fruta[];
    carrito: Fruta[];
    f1: Fruta;
    f2: Fruta;
  
    /* FrutaService es @Injectable por lo cual debemos declararlo en el constructor, 
       nunca haremos NEW y no usarlo dentro del constructor, mejor en ngOnInit  */
  
    constructor(public frutaService: FrutaService) {
      console.trace('ComparadorComponent constructor');
      this.frutas = [];
      this.carrito = [];
      this.f1 = new Fruta();
      this.f2 = new Fruta();
    }
  
    ngOnInit() {
      console.trace('ComparadorComponent ngOnInit');
      this.cargarFrutas();
    }
  
    cargarFrutas() {
      this.frutaService.getAll().subscribe(data =>{
        console.debug('Datos recibidos %o', data);
        this.frutas=data.map(el =>el);
        this.f1 = this.frutas[0];
        this.f2 = this.frutas[1];
      });
    }
  
    seleccionar(fruta: Fruta) {
      console.trace('ComparadorComponent seleccionar %o', fruta);
      this.f2 = this.f1;
      this.f1 = fruta;
    }
  }