import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fruta } from '../model/fruta';

@Injectable({
  providedIn: 'root'
})
export class FrutaService {

  endpoint: string ='http://localhost:3000/frutas';

  constructor(public http: HttpClient) { 
    console.log('FrutaService constructor');
  }

  getAll():  Observable<any> {
    return this.http.get(this.endpoint);
  }

  getByID(id: number): Observable<any>{
    let uri = this.endpoint + "/" + id;
    return this.http.get(uri);
  }

  add(fruta: Fruta): Observable<any> {
    let body = {

      "nombre": fruta.nombre,
      "precio": fruta.precio,
      "calorias": fruta.calorias,
      "oferta": fruta.oferta,
      "descuento": fruta.descuento,
      "foto": fruta.foto,
      "cantidad": fruta.cantidad,
      "colores":{
        "nombre": fruta.colores
      }

    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.endpoint, body, httpOptions);
  }

  delete(id: number): Observable<any> {
    let uri = this.endpoint + "/" + id;
    console.debug(`TareaService delete ${uri}`);
    return this.http.delete(uri);
  }

  update(fruta:Fruta): Observable<any>{
    console.trace('FrutaService modificar %o', fruta);

    let uri = this.endpoint + '/' + fruta.id;

    console.trace('uri');

    let body = 	{
      "nombre": fruta.nombre,
      "precio": fruta.precio,
      "calorias": fruta.calorias,
      "colores": fruta.colores,
      "oferta": fruta.oferta,
      "foto": fruta.foto,
      "descuento": fruta.descuento,
      "cantidad": fruta.cantidad
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Conten-Type': 'application/json'
      })
    };

    return this.http.put(uri, body, httpOptions);
  }
}