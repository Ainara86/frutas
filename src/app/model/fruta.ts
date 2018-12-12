import { defineInjector } from '@angular/core';
import { RadioControlRegistry } from '@angular/forms/src/directives/radio_control_value_accessor';

export class Fruta {
    private _id: number;
    
    private _nombre: string;
    private _precio: number;
    private _calorias: number;
    private _colores: string[];
    private _oferta: boolean;
    private _descuento: number;
    private _foto: string;
    private _cantidad: number;
    
    
    
   
    constructor(){
        this.id=-1;
        this.nombre='';
        this.precio=0;
        this.calorias=0;
        this.colores=[''];
        this.oferta=false;
        this.descuento=0;
        this.foto='https://www.masservice.es/wp-content/uploads/2017/03/servicio-fruta-fresca-en-la-oficina.jpg';
        this.cantidad=1;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }

    public get precio(): number {
        return this._precio;
    }
    public set precio(value: number) {
        this._precio = value;
    }
    
    public get calorias(): number {
        return this._calorias;
    }
    public set calorias(value: number) {
        this._calorias = value;
    }
    
    public get colores(): string[] {
        return this._colores;
    }
    public set colores(value: string[]) {
        this._colores = value;
    }
    
    public get oferta(): boolean {
        return this._oferta;
    }
    public set oferta(value: boolean) {
        this._oferta = value;
    }

    public get foto(): string {
        return this._foto;
    }
    public set foto(value: string) {
        this._foto = value;
    }

    public get descuento(): number {
        return this._descuento;
    }
    public set descuento(value: number) {
        this._descuento = value;
    }
    public get cantidad(): number {
        return this._cantidad;
    }
    public set cantidad(value: number) {
        this._cantidad = value;
    }

}


