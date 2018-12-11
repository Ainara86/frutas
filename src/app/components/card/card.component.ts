import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
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

 // registrar evento de salida
 @Output() clikCompra = new EventEmitter();

 constructor() {
   console.trace('FrutaCardComponent constructor');
 }

 ngOnInit() {
   console.trace('FrutaCardComponent ngOnInit');
   
 }

 comprar() {
   console.trace('FrutaCardComponent comprar');
  
   this.clikCompra.emit( { frutaClick : this.fruta } );

 }

 comparador(){
  let resultado;
  if (this._fruta.oferta && !this._fruta2.oferta) {
    const descuento = this._fruta.precio - (this._fruta.precio * this._fruta.descuento) / 100;
    resultado = descuento - this._fruta2.precio;
  } else if (this._fruta2.oferta && !this._fruta.oferta) {
    const descuento = this._fruta2.precio - (this._fruta2.precio * this._fruta2.descuento) / 100;
    resultado = this._fruta.precio - descuento;
  } else if (this._fruta.oferta && this._fruta2.oferta) {
    const descuento1 = this._fruta.precio - (this._fruta.precio * this._fruta.descuento) / 100;
    const descuento2 = this._fruta2.precio - (this._fruta2.precio * this._fruta2.descuento) / 100;
    resultado = descuento1 - descuento2;
  } else {
    resultado = this._fruta.precio - this._fruta2.precio;
  }
  return resultado;
}
}