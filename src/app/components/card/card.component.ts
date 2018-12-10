import { Component, OnInit, Input } from '@angular/core';
import { Fruta } from 'src/app/model/fruta';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  _fruta: Fruta;
  _fruta2?: Fruta; // ? opcional

 @Input('_fruta') set fruta(value: Fruta) {
   if (value) {
     this._fruta = value;
   } else {
     console.debug('fruta undefined => new Fruta()');
     this._fruta = new Fruta();
   }
 }

 get fruta(): Fruta {
   return this._fruta;
 }

 @Input('_fruta2') set fruta2 (value: Fruta) {
   this._fruta2 = value;
 }

 get fruta2(): Fruta {
   return this._fruta2;
 }

 constructor() {
   console.trace('FrutaCardComponent constructor');
  
   this.fruta = new Fruta();
   this.fruta.nombre = 'Malacaton';
   this.fruta.calorias = 17.4;
   this.fruta.precio = 3.45;
   this.fruta.oferta = true;
   this.fruta.descuento = 10;
   this.fruta.foto = 'https://pbs.twimg.com/profile_images/486884835571408897/iZnw1lBq_400x400.png';
 

 }

 ngOnInit() {
   console.trace('FrutaCardComponent ngOnInit');
 }

}